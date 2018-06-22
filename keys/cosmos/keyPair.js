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
let MODEL = require('./client/model');
const request = require('axios');
let thrift = require('thrift');
let irisService = require('irishub-rpc/codegen/gen-nodejs/IRISHubService');
let chainService = require('blockchain-rpc/codegen/gen-nodejs/BlockChainService');
let candidatelist = require('irishub-rpc/codegen/gen-nodejs/model_candidateList_types');
let candidateDetail = require('irishub-rpc/codegen/gen-nodejs/model_candidateDetail_types');
let delegatorCandidate = require('irishub-rpc/codegen/gen-nodejs/model_delegatorCandidateList_types');
let sequence = require('blockchain-rpc/codegen/gen-nodejs/model_sequence_types');
let buildTx = require('blockchain-rpc/codegen/gen-nodejs/model_buildTx_types');
let common = require('blockchain-rpc/codegen/gen-nodejs/model_common_types');
let transport = thrift.TBufferedTransport;
let protocol = thrift.TJSONProtocol;
let irisConnection = thrift.createXHRConnection("192.168.150.160", "9080", {path: "/irishub"}, {
    transport: transport,
    protocol: protocol
});
let chainConnection = thrift.createXHRConnection("192.168.150.160", "9080", {path: "/blockchain"}, {
    transport: transport,
    protocol: protocol
});
let chainClient = thrift.createClient(chainService, chainConnection);
let irisClient = thrift.createClient(irisService, irisConnection);
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
    let type = secret.slice(0, 1)[0];
    secret = secret.slice(1, secret.length);

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

Balance = function (addr) {
    return new Promise(function (resolve, reject) {
        client.queryAccount(addr).then(info => {
            resolve(info.data.coins)
        }).catch(e => {
            reject('')
        })
    });
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

Validators = function (addr, page, perPage, sort, q) {
    return new Promise(function (resolve, reject) {
        let args = new candidatelist.CandidateListRequest();
        args.address = addr;
        args.page = page;
        args.perPage = perPage;
        args.sort = sort;
        args.q = q;
        irisClient.GetCandidateList(args, function (err, response) {
            if (err) {
                reject(err);
            }
            resolve(response);
        })
    })
}

Validator = function (addr, pubKey) {
    return new Promise(function (resolve, reject) {
        let args = new candidateDetail.CandidateDetailRequest();
        args.address = addr;
        args.pubKey = pubKey;

        irisClient.GetCandidateDetail(args, function (err, response) {
            if (err) {
                reject(err);
            }
            resolve(response);
        })
    });
}

DelegatorCandidateList = function (addr, page, perPage, sort, q) {
    return new Promise(function (resolve, reject) {
        let args = new delegatorCandidate.DelegatorCandidateListRequest();
        args.address = addr;
        args.page = page;
        args.perPage = perPage;
        args.sort = sort;
        args.q = q;
        irisClient.GetDelegatorCandidateList(args, function (err, response) {
            if (err) {
                reject(err);
            }
            resolve(response);
        })
    });
}

Candidate = function (addr, pubkey) {
    return new Promise(function (resolve, reject) {
        request.get(gaiaUrl + '/query/stake/candidate/' + pubkey).then(list => {
            this.Delegator(addr, pubkey, list.data.data).then(v => {
                resolve(v);
            })
        })
    })
}
Delegator = function (addr, pubkey, list) {
    return new Promise(function (resolve, reject) {
        request.get(gaiaUrl + '/query/stake/delegator/' + addr + '/' + pubkey).then(v => {
            list.yShares = v.data.data.Shares;
            resolve(list)
        }).catch(error => {
            list.yShares = 0;
            resolve(list)
        })
    })
}
Transaction = function (addr) {
    return new Promise(function (resolve, reject) {
        request.get(bianjieUrl + '/tx/coin/' + addr).then(list => {
            resolve(list.data)
        })
    })
}
GetAllAssets = function (addr) {
    return new Promise(function (resolve, reject) {
        request.get(rainbowUrl + "/shares/delegator/" + addr).then(list => {
            resolve(list.data)
        })
    })
}
TransactionPagenation = function (addr, direction, pageNumber, pageSize, startTime, endTime, sort) {
    return new Promise(function (resolve, reject) {
        request.get(rainbowUrl + '/txs?address=' + addr + '&tx_type=' + direction +
            "&page=" + pageNumber + "&per_page=" + pageSize + "&start_time=" + startTime + "&end_time=" + endTime + "&sort=" + sort).then(list => {

            resolve(list.data)
        })
    })
}

TransactionHash = function (hash) {
    return new Promise(function (resolve, reject) {
        request.get(gaiaUrl + '/tx/' + hash).then(list => {
            resolve(list.data)
        })
    })
}
TxStake = function (addr) {
    return new Promise(function (resolve, reject) {
        request.get(bianjieUrl + '/txs/stake?address=' + addr + "&page=1&size=100").then(list => {
            resolve(list.data)
        })
    })
}

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
}

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
                txArgs.receiver = new common.Address({addr: tx.pub_key});
            } else {
                txArgs.receiver = new common.Address({addr: tx.to});
            }
            txArgs.sender = new common.Address({addr: tx.from});
            chainClient.BuildTx(txArgs, function (err, response) {
                console.log(err);
                console.log(response);
                if (err) {
                    reject(err);
                }
                let PostTx = response.ext;
                let signTx = response.data;
                PostTx.data.signature.Sig = new MODEL.Sig("ed25519", Hex.bytesToHex(Nacl.sign.detached(new Uint8Array(Hex.hexToBytes(signTx)), new Uint8Array(privateKey))));
                let key = Nacl.sign.keyPair.fromSecretKey(new Uint8Array(privateKey));
                let pub = key.publicKey;
                PostTx.data.signature.Pubkey = new MODEL.Pubkey("ed25519", Hex.bytesToHex(pub));
                chainClient.PostTx(JSON.stringify(tx), function (err, response) {
                    if (err) {
                        reject(err);
                    }
                    resolve(response);
                })
            })
        })


    });
};

ByteTx = function (tx, resolve, privateKey) {

    client.request("POST", "/byteTx", JSON.stringify(tx)).then(function (signTx) {
        tx = tx.tx;
        tx.data.signature.Sig = new MODEL.Sig("ed25519", Hex.bytesToHex(Nacl.sign.detached(new Uint8Array(Hex.hexToBytes(signTx)), new Uint8Array(privateKey))));
        let key = Nacl.sign.keyPair.fromSecretKey(new Uint8Array(privateKey));
        let pub = key.publicKey;
        tx.data.signature.Pubkey = new MODEL.Pubkey("ed25519", Hex.bytesToHex(pub));
        client.postTx(JSON.stringify(tx)).then(result => resolve(result));
    });
}

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
};

module.exports = {
    Create: Create,
    Recover: Recover,
    Import: Import,
    Balance: Balance,
    Sign: Sign,
    TxStake: TxStake,
    Init: Init,
    TransactionHash: TransactionHash,
    Transaction: Transaction,
    GetAllAssets: GetAllAssets,
    TransactionPagenation: TransactionPagenation,
    Validators: Validators,
    Validator: Validator,
    DelegatorCandidateList: DelegatorCandidateList,
    IsValidAddress: IsValidAddress,
    IsValidPrivate: IsValidPrivate,
};