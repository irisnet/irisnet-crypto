let Wordcodec = require("../wordcodec");
let Nacl = require("tweetnacl");
let Hex = require("../hex");

let CosmosKeyPair = require("../cosmos/keyPair");

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
    }
};

Init = function (urlList) {
    CosmosKeyPair.Init(urlList);
};
DelegatorShares = function (bk, address) {
    switch (bk) {
        case "cosmos":
            return CosmosKeyPair.DelegatorShares(address);
    }
};
module.exports = {
    Create: Create,
    Recover: Recover,
    Import: Import,
    Sign: Sign,
    TxStake: TxStake,
    TransactionHash: TransactionHash,
    Validators: Validators,
    Balance: Balance,
    Init: Init,
    TxList:TxList,
    Transaction: Transaction,
    IsValidAddress: IsValidAddress,
    IsValidPrivate: IsValidPrivate,
    DelegatorShares: DelegatorShares,

};
