'use strict'
let gaia = require("./gaia");
const MODEL = require("./model");
let client;
let urlList;
let account = '';
Create = function (model) {
    let key = new client.Key();
    return new Promise(function (resolve) {
        key.generate(model.name, model.password, function (result) {
            resolve({
                "phrase": result.seed_phrase,
                "address": result.addr,
                "privateKey": result.priKey,
                "publicKey": result.pubkey
            })
        }, function (err) {
            resolve(err);
        })
    });


};

Recover = function (secret) {

};

Import = function (secret, algo) {

};

Sign = function (tx) {
    account = new MODEL.Account(tx.name, tx.password, tx.addr);
    this.Init(urlList);
    let amts = [new MODEL.Coin(tx.count, "fermion")];
    let fee = new MODEL.Coin(tx.fees, "fermion");
    return new Promise(function (resolve) {
        client.transfer(tx.to, amts, fee, function (model) {
            resolve(model.hash)
        }, function (err) {
            console.log(err);
        })
    });

};

Balance = function (addr) {
    return new Promise(function (resolve,reject) {
        client.queryAccount(addr, function (info) {
            resolve(info.data.coins[0].amount)
        },function (err) {
            reject('')
        })
    });

}

IsValidAddress = function (address) {
    return /^[0-9a-fA-F]{40}$/i.test(address);
};

IsValidPrivate = function (privateKey) {
    return /^[0-9a-fA-F]{128}$/i.test(privateKey);
};

Init = function (url) {
    urlList = url;
    client = new gaia.Client(account, url.gaia, url.tendermint);
    client.setDevMode();
}

module.exports = {
    Create: Create,
    Recover: Recover,
    Import: Import,
    Sign: Sign,
    Init: Init,
    Balance: Balance,
    IsValidAddress: IsValidAddress,
    IsValidPrivate: IsValidPrivate
};