let Wordcodec = require("../wordcodec");
let Nacl = require("tweetnacl");
let Hex = require("../hex");

let CosmosKeyPair = require("../cosmos/keyPair");
let EthermintKeyPair = require("../ethermint/keyPair");

const BigNumber = require('bignumber.js');
/**
 * Create new wallet
 * @param {string} bk: blockchain type
 * @param {string} algo: ecc algo, now supported: secp256k1,ed25519(default)
 * @param {string} language: brain wallet language, now supported: chinese_simplified,japanese,spanish,english(default)
 * @returns {{address: string, phrase: string, key: *|key|{privateKey, publicKey}|string|string|string}}
 */
Create = function (bk, algo, language) {
    let secret = Nacl.randomBytes(16);
    let keyPair;
    switch (bk) {
        case "cosmos":
            keyPair = CosmosKeyPair.Create(secret, algo);
    }
    if (keyPair) {
        let seed = Wordcodec.BytesToWords(keyPair.secret, language);
        let phrase = seed.toString().replace(/,/g, " ");
        return {
            "address": keyPair.address,
            "phrase": phrase,
            "privateKey": keyPair.privateKey,
            "publicKey": keyPair.publicKey
        };
    }
};

/**
 * recover a wallet from phrase
 * @param {string} bk: blockchain type
 * @param {string} seedphrase: phrase
 * @param {string} language: brain wallet language, now supported: chinese_simplified,japanese,spanish,english(default)
 * @returns {{address: string, phrase: string, key: *|key|{privateKey, publicKey}|string|string|string}}
 */
Recover = function (bk, seedphrase, language) {
    let words = seedphrase.split(" ");
    let secret;
    try {
        secret = Wordcodec.WordsToBytes(words, language);
    } catch (e) {
        return {
            "address": '',
        }
    }
    let keyPair;
    switch (bk) {
        case "cosmos":
            keyPair = CosmosKeyPair.Recover(secret);
    }
    if (keyPair) {
        return {
            "address": keyPair.address,
            "phrase": seedphrase,
            "privateKey": keyPair.privateKey,
            "publicKey": keyPair.publicKey
        };
    }
};

/**
 * import a wallet from privateKey
 * @param {string} bk: blockchain type
 * @param {string} privateKey: privateKey(hex)
 * @returns {{address: string, key: *|key|{privateKey, publicKey}|string|string|string}}
 */
Import = function (bk, privateKey) {
    privateKey = Hex.hexToBytes(privateKey);
    let keyPair;
    switch (bk) {
        case "cosmos":
            keyPair = CosmosKeyPair.Import(privateKey);
            break;
        case "ethermint":
            keyPair = EthermintKeyPair.Import(privateKey);
            break;
    }
    if (keyPair) {
        return {
            "address": keyPair.address,
            "privateKey": keyPair.privateKey,
            "publicKey": keyPair.publicKey
        };
    }
};

/**
 * sign tx
 * @param {string} bk: blockchain type
 * @param {object} tx: tx
 * @param {string} privateKey: privateKey(hex)
 * @returns {*}
 * @constructor
 */
Sign = function (bk, tx, privateKey) {
    privateKey = Hex.hexToBytes(privateKey);
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.Sign(tx, privateKey);
        case "ethermint":
            let Ether = new BigNumber(10e+17);
            let rawTx = {
                gasPrice: tx.fees,
                value: new BigNumber(tx.count).times(Ether),
                gasLimit: 21000,
                to: tx.to
            };
            return EthermintKeyPair.Sign(rawTx, privateKey);
    }
};

Transfer = function(bk, tx,privateKey){
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.Transfer(tx)
        case "ethermint":
            let Ether = new BigNumber(10e+17);
            let rawTx = {
                gasPrice: tx.fees,
                value: new BigNumber(tx.count).times(Ether),
                gasLimit: 21000,
                to: tx.to
            };
            return EthermintKeyPair.Sign(rawTx, privateKey);
    }
}

Delegate = function(bk, tx,privateKey){
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.Delegate(tx)
        case "ethermint":
            let Ether = new BigNumber(10e+17);
            let rawTx = {
                gasPrice: tx.fees,
                value: new BigNumber(tx.count).times(Ether),
                gasLimit: 21000,
                to: tx.to
            };
            return EthermintKeyPair.Sign(rawTx, privateKey);
    }
}

Unbond = function(bk, tx,privateKey){
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.Unbond(tx)
        case "ethermint":
            let Ether = new BigNumber(10e+17);
            let rawTx = {
                gasPrice: tx.fees,
                value: new BigNumber(tx.count).times(Ether),
                gasLimit: 21000,
                to: tx.to
            };
            return EthermintKeyPair.Sign(rawTx, privateKey);
    }
}

/**
 * send signed tx
 * @param {string} bk: blockchain type
 * @param {byte} serializedTx
 * @returns {*}
 * @constructor
 */
SendRawTransaction = function (bk, serializedTx) {
    switch (bk) {
        case "cosmos":
            break;
        case "ethermint":
            return EthermintKeyPair.SendRawTransaction(serializedTx);
    }
};

/**
 * get transaction record
 * @param {string} bk: blockchain type
 * @param {string} address: account address(hex)
 * @returns []
 * @constructor
 */
Transaction = function (bk, address) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.Transaction(address);
    }
};
GetAllAssets = function (bk, address) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.GetAllAssets(address);
    }
};
TransactionPagenation = function (bk, address, direction,pageNumber, pageSize,startTime,endTime,sort) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.TransactionPagenation(address, direction, pageNumber, pageSize,startTime,endTime,sort);
    }
};
TxList = function (bk, address, direction,pageNumber, pageSize,startTime,endTime,sort) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.TxList(address, direction, pageNumber, pageSize,startTime,endTime,sort);
    }
};
/**
 * get transaction by hash
 * @param {string} bk: blockchain type
 * @param {string} hash: transaction hash
 * @returns {*}
 * @constructor
 */
TransactionHash = function (bk, hash) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.TransactionHash(hash);
    }
};

/**
 * get stake record ,查询委托记录
 * @param {string} bk: blockchain type
 * @param {string} address: account address(hex)
 * @returns {*}
 * @constructor
 */
TxStake = function (bk, address) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.TxStake(address);
    }
};

/**
 * get account balance
 * @param {string} bk: blockchain type
 * @param {string} address: account address(hex)
 * @returns {*}
 * @constructor
 */
Balance = function (bk, address) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.Balance(address);
        case "ethermint":
            return EthermintKeyPair.Balance(address);
    }
};

/**
 * get all validators
 * @param {string} bk: blockchain type
 * @param {string} address: account address(hex)
 * @returns {*}
 * @constructor
 */
Validators = function (bk, address, page, perPage, sort, q) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.Validators(address,page, perPage, sort, q);
    }
};

/**
 * validate address
 * @param {string} bk: blockchain type
 * @param {string} address: account address(hex)
 * @returns {boolean}
 * @constructor
 */
IsValidAddress = function (bk, address) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.IsValidAddress(address);
        case "ethermint":
            return EthermintKeyPair.IsValidAddress(address);
    }
};

/**
 * validate private
 * @param {string} bk: blockchain type
 * @param {string} privateKey: privateKey(hex)
 * @returns {boolean}
 * @constructor
 */
IsValidPrivate = function (bk, privateKey) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.IsValidPrivate(privateKey);
        case "ethermint":
            return EthermintKeyPair.IsValidPrivate(privateKey);
    }
};

Init = function (urlList) {
    CosmosKeyPair.Init(urlList);
    EthermintKeyPair.Init(urlList);
};

module.exports = {
    Create: Create,
    Recover: Recover,
    Import: Import,
    Sign: Sign,
    TxStake: TxStake,
    TransactionHash: TransactionHash,
    Validators: Validators,
    SendRawTransaction: SendRawTransaction,
    Balance: Balance,
    Init: Init,
    TxList:TxList,
    Transaction: Transaction,
    GetAllAssets: GetAllAssets,
    TransactionPagenation: TransactionPagenation,
    IsValidAddress: IsValidAddress,
    IsValidPrivate: IsValidPrivate,
    Transfer: Transfer,
    Delegate: Delegate,
    Unbond: Unbond,
};
