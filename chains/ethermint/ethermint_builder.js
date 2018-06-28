'use strict';

const Builder = require("../../builder");
const BigNumber = require('bignumber.js');
const EthereumTx = require('ethereumjs-tx');
const Old = require('old');

const SignMsg = require("../sign_msg");


class EthermintBuilder extends Builder{
    buildSignMsg(tx) {
        let ether = new BigNumber(10e+17);
        let rawTx = new EthermintMsg(tx.fee.amount,new BigNumber(tx.amount[0].amount).times(ether),21000,tx.receiver.addr,tx.sequence);
        return rawTx;
    }

    buildTx(tx,signMsg,publicKey) {
        throw new Error("not implement");
    }

    buildAndSignTx(tx, privateKey) {
        let ether = new BigNumber(10e+17);
        let rawTx = new EthermintMsg(tx.fee.amount,new BigNumber(tx.amount[0].amount).times(ether),21000,tx.receiver.addr,tx.sequence);
        let ethereumTx = new EthereumTx(rawTx);
        ethereumTx.sign(new Buffer(privateKey));
        let serializedTx = ethereumTx.serialize()
        return serializedTx.toString('hex');
    }
}

class EthermintMsg extends SignMsg{
    constructor(gasPrice, value, gasLimit, to, nonce) {
        super();
        this.gasPrice = gasPrice;
        this.value = value;
        this.gasLimit = gasLimit;
        this.to = to;
        this.nonce = nonce
    }

    GetSignBytes(){
        return this;
    }
}

module.exports = Old(EthermintBuilder);