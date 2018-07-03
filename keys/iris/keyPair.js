let NameEd25519 = "ed25519";
let NameSecp256k1 = "secp256k1";
const TypeEd25519 = 1;
const TypeSecp256k1 = 2;
let PubKey = require("./pubKey");
let PrivKey = require("./privKey");
let Hex = require("../hex");
let Nacl = require("tweetnacl");
let client;

let MODEL = require('./client/model');
const request = require('axios');

let thrift = require('thrift');
let chainService = require('blockchain-rpc/codegen/gen-nodejs/BlockChainService');

let blockChainThriftModel = require('blockchain-rpc/codegen/gen-nodejs/model_types');

let transport = thrift.TBufferedTransport;
let protocol = thrift.TJSONProtocol;

let chainConnection = thrift.createXHRConnection("192.168.150.110", "9081", {path: "/blockchain"}, {
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
            let txArgs = new blockChainThriftModel.BuildTxRequest();
            let txObj = {};
            // tx.typeGate = "coin"
            console.log(nonce)
            txObj.sequence = nonce + 1;
            txObj.amount = [new blockChainThriftModel.Coin({amount: tx.count, denom: tx.type})];
            txObj.fee = new blockChainThriftModel.Fee({amount: tx.fees, denom: "fermion"});
            if (tx.typeGate === 'delegate'|| tx.typeGate === 'unbond') {
                txObj.receiver = new blockChainThriftModel.Address({addr: tx.pub_key, app:"sigs"});
            } else if(tx.typeGate === 'coin') {
                txObj.receiver = new blockChainThriftModel.Address({addr: tx.to, app:"sigs"});
            }
            txObj.sender = new blockChainThriftModel.Address({addr: tx.from, app: "sigs"});
            txObj.type = tx.typeGate;

            txArgs.tx = txObj;
            chainClient.BuildTx(txArgs, function (err, response) {
                if (err) {
                    reject(err);
                    return
                }
                let readyTx = JSON.parse(response.ext.toString());
                let signTx = response.data.toString();
                signTx = signTx.replace(/"/g,"");
                readyTx.data.signature.Sig = new MODEL.Sig("ed25519", Hex.bytesToHex(Nacl.sign.detached(new Uint8Array(Hex.hexToBytes(signTx)), new Uint8Array(privateKey))));
                let key = Nacl.sign.keyPair.fromSecretKey(new Uint8Array(privateKey));
                let pub = key.publicKey;
                readyTx.data.signature.Pubkey = new MODEL.Pubkey("ed25519", Hex.bytesToHex(pub));
                let postTx = new blockChainThriftModel.PostTxRequest();
                postTx.tx = new Buffer(JSON.stringify(readyTx));
                chainClient.PostTx(postTx, function (err, response) {
                    if (err) {
                        reject(err);
                    }
                    if(response == undefined){
                        response = []
                    }
                    resolve(response);
                })
            })
        })
    });
};

getSequence = function (addr) {
    return new Promise(function (resolve, reject) {
        let args = new blockChainThriftModel.SequenceRequest();
        args.address = addr;
        let nonce = 0;
        chainClient.GetSequence(args, function (err, response) {
            if (err) {
                resolve(nonce)
                return
            }
            nonce = parseInt(response.sequence.toString());
            resolve(nonce);
        });
    })
};



IsValidAddress = function (address) {
    return /^[0-9a-fA-F]{40}$/i.test(address);
};


IsValidPrivate = function (privateKey) {
    return /^[0-9a-fA-F]{128}$/i.test(privateKey);
};

BlockChainSupportList = function(){
  //TODO(shine)返回客户端已支持的区块链列表
  return ["Iris"];
}

Init = function (url) {
    client = require('cosmos-sdk')(url.gaia);
};

module.exports = {
    Create: Create,
    Recover: Recover,
    Import: Import,
    Sign: Sign,
    Init: Init,
    IsValidAddress: IsValidAddress,
    IsValidPrivate: IsValidPrivate,
    BlockChainSupportList:BlockChainSupportList
};