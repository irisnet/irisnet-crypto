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
let MODEL = require('./client/model');
const request = require('axios')
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

    let amts = [new MODEL.Coin(tx.count, tx.type)];
    let fee = new MODEL.Coin(tx.fees, "fermion");
    return new Promise(function (resolve) {
        this.transfer(tx, amts, fee, privateKey).then(model => {
            resolve(model)
        })
    });
};

Validators = function (addr) {
    return new Promise(function (resolve, reject) {
        request.get(gaiaUrl + '/query/stake/candidates').then(v => {
            let length = v.data.data.length;
            let i = 0;
            v.data.data.forEach(item => {
                this.Candidate(addr, item.data).then(list => {
                    ++i;
                    item.model = list;
                    if (i == length) {
                        resolve(v.data.data);
                    }
                })
            })
        })
    })
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
        request.get(bianjieUrl + '/tx/coin/'+ addr).then(list => {
            resolve(list.data)
        })
    })
}

TransactionPagenation = function (addr, pageNumber, pageSize) {
    return new Promise(function (resolve, reject) {
        request.get(bianjieUrl + '/tx/coin/'+ addr + "/" + pageNumber + "/" + pageSize).then(list => {
            
            resolve(list.data)
        })
    })
}

TransactionHash = function (hash) {
    return new Promise(function (resolve, reject) {
        request.get(gaiaUrl+ '/tx/'+ hash).then(list => {
            resolve(list.data)
        })
    })
}
TxStake=function (addr) {
    return new Promise(function (resolve, reject) {
        request.get(bianjieUrl+ '/account/'+ addr+'/tx/stake').then(list => {
            resolve(list.data)
        })
    })
}

transfer = function (tx, amts, fees, privateKey) {
    return new Promise(function (resolve, reject) {
        //获取交易序号
        client.queryNonce(tx.from).then(function (result) {
            // nonce default 1
            let nonce = 1;
            if (!isNaN(result.data)) {
                nonce = result.data + 1;
            }
            return nonce;
        }).catch(function () {
            // nonce values 1 when error
            return 1;
        }).then(nonce => {
            if (tx.typeGate === 'delegate') {
                let From = new MODEL.Actor("", "sigs", tx.from);
                let delegateTx = {
                    pub_key: tx.pub_key,
                    amount: amts[0],
                    sequence: nonce,
                    from: From
                }
                client.buildDelegate(JSON.stringify(delegateTx))
                    .then(function (tx) {
                        tx = {tx};
                        ByteTx(tx, resolve, privateKey)
                    }).catch(error => {
                    console.log(error);
                })

            } else if (tx.typeGate === 'unbond') {
                let From = new MODEL.Actor("", "sigs", tx.from);
                let delegateTx = {
                    pub_key: tx.pub_key,
                    amount: amts[0].amount,
                    sequence: nonce,
                    from: From
                }
                client.buildUnbond(JSON.stringify(delegateTx))
                    .then(function (tx) {
                        tx = {tx};
                        ByteTx(tx, resolve, privateKey)
                    }).catch(error => {
                    console.log(error);
                })

            } else {
                let To = new MODEL.Actor("", "sigs", tx.to);
                let From = new MODEL.Actor("", "sigs", tx.from);
                //构建交易
                let sendTnput = new MODEL.SendTnput(From, To, amts, nonce, fees);
                client.buildSend(JSON.stringify(sendTnput)).then(function (tx) {
                    tx = {tx};
                    ByteTx(tx, resolve, privateKey)
                })
            }

        });
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
    bianjieUrl=url.bianjie;
    client = require('cosmos-sdk')(url.gaia);
};

module.exports = {
    Create: Create,
    Recover: Recover,
    Import: Import,
    Balance: Balance,
    Sign: Sign,
    TxStake:TxStake,
    Init: Init,
    TransactionHash:TransactionHash,
    Transaction: Transaction,
	TransactionPagenation: TransactionPagenation,
    Validators: Validators,
    IsValidAddress: IsValidAddress,
    IsValidPrivate: IsValidPrivate
};