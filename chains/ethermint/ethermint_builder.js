'use strict';

const Builder = require("../../builder");
const BigNumber = require('bignumber.js');
const EthereumTx = require('ethereumjs-tx');
const Old = require('old');

const SignMsg = require("../sign_msg");


class EthermintBuilder extends Builder {
    buildTx(tx) {
        let req = super.buildParam(tx);
        let ether = new BigNumber(10e+17);
        let rawTx = new EthermintMsg(req.fees[0].amount, new BigNumber(req.coins[0].amount).times(ether), 21000, req.to, req.acc.sequence);
        return rawTx;
    }

    signTx(tx,privateKey) {
        let ethereumTx = new EthereumTx(tx);
        ethereumTx.sign(new Buffer(privateKey));
        let serializedTx = ethereumTx.serialize();
        return serializedTx.toString('hex');
    }

    buildAndSignTx(tx, privateKey) {
        let rawTx = this.buildTx(tx);
        let ethereumTx = new EthereumTx(rawTx);
        ethereumTx.sign(new Buffer(privateKey));
        let serializedTx = ethereumTx.serialize();
        return serializedTx.toString('hex');
    }
}

class EthermintMsg extends SignMsg {
    constructor(gasPrice, value, gasLimit, to, nonce) {
        super();
        this.gasPrice = gasPrice;
        this.value = value;
        this.gasLimit = gasLimit;
        this.to = to;
        this.nonce = nonce
    }

    GetSignBytes() {
        return this;
    }
}

module.exports = Old(EthermintBuilder);