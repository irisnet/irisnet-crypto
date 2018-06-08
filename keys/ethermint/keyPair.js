'use strict'
let EthUtil = require('ethereumjs-util');
let EthereumTx = require('ethereumjs-tx');
const Web3 = require("web3");
let Hex = require("../hex");
const BigNumber = require('bignumber.js');
const Ether = new BigNumber(10e+17);

let web3;
let Import = function (secret) {
    let publicKey = EthUtil.privateToPublic(secret);
    let addr = EthUtil.publicToAddress(publicKey);
    return {
        "address": "0x" + Hex.bytesToHex(addr),
        "privateKey": Hex.bytesToHex(secret),
        "publicKey": Hex.bytesToHex(publicKey)
    };
};

let Sign = function (rawTx, privateKey) {
    let addr = EthUtil.privateToAddress(privateKey);
    rawTx.nonce = web3.eth.getTransactionCount('0x' + Hex.bytesToHex(addr));
    let tx = new EthereumTx(rawTx);
    tx.sign(new Buffer(privateKey));
    let serializedTx = tx.serialize();
    return this.SendRawTransaction("0x" + serializedTx.toString('hex'));
};

let SendRawTransaction = function (serializedTx) {
    return new Promise(function (resolve) {
        web3.eth.sendRawTransaction(serializedTx, function (err, hash) {
            let result;
            if (!err) {
                result = web3.eth.getTransactionReceipt(hash);
            }
            resolve({err, result});
        });
    });
};

let Balance = function (addr, url) {
    return new Promise(function (resolve) {
        let ret = new BigNumber(web3.eth.getBalance(addr));
        resolve(parseFloat(ret.dividedBy(Ether)).toFixed(2));
    });
};

let IsValidAddress = function (address) {
    return EthUtil.isValidAddress(address);
};

let IsValidPrivate = function (privateKey) {
    return EthUtil.isValidPrivate(new Buffer(Hex.hexToBytes(privateKey)));
};
let Init = function (url) {
    web3 = new Web3(new Web3.providers.HttpProvider(url.ethermint));
};

module.exports = {
    Import: Import,
    Sign: Sign,
    SendRawTransaction: SendRawTransaction,
    Balance: Balance,
    Init: Init,
    IsValidAddress: IsValidAddress,
    IsValidPrivate: IsValidPrivate
};