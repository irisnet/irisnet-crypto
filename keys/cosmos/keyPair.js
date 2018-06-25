let NameEd25519 = "ed25519";
let NameSecp256k1 = "secp256k1";
const TypeEd25519 = 1;
const TypeSecp256k1 = 2;
let PubKey = require("./pubKey");
let PrivKey = require("./privKey");
let Hex = require("../hex");
let Nacl = require("tweetnacl");
let client;
let gaiaUrl;
let bianjieUrl;
let rainbowUrl;
let apiServerIP;
let apiServerPort;
let MODEL = require('./client/model');
const request = require('axios');

let thrift = require('thrift');

let sequence = require('blockchain-rpc/codegen/gen-nodejs/model_sequence_types');
let buildTx = require('blockchain-rpc/codegen/gen-nodejs/model_buildTx_types');
let common = require('blockchain-rpc/codegen/gen-nodejs/model_common_types');

let transport = thrift.TBufferedTransport;
let protocol = thrift.TJSONProtocol;

let chainConnection = thrift.createXHRConnection("47.104.155.125", "9081", {path: "/blockchain"}, {
    transport: transport,
    protocol: protocol
});
let chainClient = thrift.createClient(chainService, chainConnection);

//algo must be a supported algorithm now: ed25519, secp256k1
Create = function (secret, algo) {
    let pub;
    let addr;
    let privateKey;
    let publicKey;
    //default algorithm ed25519
    switch (algo) {
        case NameSecp256k1:
            break;
        case NameEd25519:
        default:
            let secretKey = PrivKey.GenSeedEd25519FromSecret(secret);
            let key = Nacl.sign.keyPair.fromSeed(new Uint8Array(secretKey));
            pub = key.publicKey;
            privateKey = Hex.bytesToHex(key.secretKey);
            // we append the type byte to the serialized secret to help with recovery
            // ie [secret] = [secret] + [type]
            //
            addr = PubKey.Address_Ed25519(pub, TypeEd25519);
            publicKey = Hex.bytesToHex(pub);
            addr = addr.toUpperCase();
            secret = Array.from(secret);
            secret.push(TypeEd25519);
    }
    return {
        "secret": secret,
        "address": addr,
        "privateKey": privateKey,
        "publicKey": publicKey
    };
};

Recover = function (secret) {
    let type = secret.slice(secret.length - 1, secret.length)[0];
    secret = secret.slice(0, secret.length - 1);

    let pub;
    let addr;
    let privateKey;
    let publicKey;
    switch (type) {
        case TypeSecp256k1:
            break;
        case TypeEd25519:
            let secretKey = PrivKey.GenSeedEd25519FromSecret(secret);
            let key = Nacl.sign.keyPair.fromSeed(new Uint8Array(secretKey));
            pub = key.publicKey;
            privateKey = Hex.bytesToHex(key.secretKey);
            addr = PubKey.Address_Ed25519(pub, TypeEd25519);
            publicKey = Hex.bytesToHex(pub);
            addr = addr.toUpperCase();
            break;
        default:
            break;
    }
    return {
        "address": addr,
        "privateKey": privateKey,
        "publicKey": publicKey
    };
};

Import = function (secret, algo) {
    let pub;
    let addr;
    let privateKey;
    let publicKey;
    switch (algo) {
        case NameSecp256k1:
            break;
        default:
            let key = Nacl.sign.keyPair.fromSecretKey(new Uint8Array(secret));
            pub = key.publicKey;
            privateKey = Hex.bytesToHex(key.secretKey);
            addr = PubKey.Address_Ed25519(pub, TypeEd25519);
            publicKey = Hex.bytesToHex(pub);
            addr = addr.toUpperCase();
    }
    return {
        "address": addr,
        "privateKey": privateKey,
        "publicKey": publicKey
    };
};

Sign = function (tx, privateKey) {
    // let amts = [new MODEL.Coin(tx.count, tx.type)];
    // let fee = new MODEL.Coin(tx.fees, "fermion");
    return new Promise(function (resolve) {
        this.transfer(tx, privateKey).then(model => {
            resolve(model)
        })
    });
};


transfer = function (tx, privateKey) {
    return new Promise(function (resolve, reject) {
        //获取交易序号
        this.getSequence(tx.from).then(nonce => {
            // build tx
            let txArgs = new buildTx.BuildTxRequest();
            txArgs.sequence = nonce + 1;
            txArgs.amount = [new common.Coin({amount: tx.count, denom: tx.type})];
            txArgs.fee = new common.Fee({amount: tx.fees, denom: "fermion"});
            if (tx.typeGate === 'delegate') {
                txArgs.receiver = new common.Address({addr: tx.pub_key, app:"sigs"});
            } else {
                txArgs.receiver = new common.Address({addr: tx.to, app:"sigs"});
            }
            txArgs.sender = new common.Address({addr: tx.from, app: "sigs"});
            txArgs.txType = tx.typeGate;
            chainClient.BuildTx(txArgs, function (err, response) {
                if (err) {
                    reject(err);
                }
                let readyTx = JSON.parse(response.ext.toString());
                console.log(response.ext.toString());
                console.log(response.data.toString());
                let signTx = response.data.toString();
                signTx = signTx.replace(/"/g,"");
                readyTx.data.signature.Sig = new MODEL.Sig("ed25519", Hex.bytesToHex(Nacl.sign.detached(new Uint8Array(Hex.hexToBytes(signTx)), new Uint8Array(privateKey))));
                let key = Nacl.sign.keyPair.fromSecretKey(new Uint8Array(privateKey));
                let pub = key.publicKey;
                readyTx.data.signature.Pubkey = new MODEL.Pubkey("ed25519", Hex.bytesToHex(pub));
                let postTx = new postTxTypes.PostTxRequest();
                console.log(JSON.stringify(readyTx));
                postTx.tx = new Buffer(JSON.stringify(readyTx));
                chainClient.PostTx(postTx, function (err, response) {
                    if (err) {
                        reject(err);
                    }
                    resolve(response);
                })
            })
        })
    });
};

getSequence = function (addr) {
    return new Promise(function (resolve, reject) {
        let args = new sequence.SequenceRequest();
        args.address = addr;
        let nonce = 0;
        chainClient.GetSequence(args, function (err, response) {
            if (err) {
                reject(err)
            }
            nonce = parseInt(response.sequence.toString());
            resolve(nonce);
        });
    })
};


/**
 * @return {boolean}
 */
IsValidAddress = function (address) {
    return /^[0-9a-fA-F]{40}$/i.test(address);
};

/**
 * @return {boolean}
 */
IsValidPrivate = function (privateKey) {
    return /^[0-9a-fA-F]{128}$/i.test(privateKey);
};

Init = function (url) {
    gaiaUrl = url.gaia;
    bianjieUrl = url.bianjie;
    rainbowUrl = url.rainbow;
    client = require('cosmos-sdk')(url.gaia);
    apiServerIP = url.apiServerIP;
    apiServerPort = url.apiServerPort;
};

module.exports = {
    Create: Create,
    Recover: Recover,
    Import: Import,
    Sign: Sign,
    Init: Init,
    IsValidAddress: IsValidAddress,
    IsValidPrivate: IsValidPrivate

};