'use strict';

const Builder = require("../../builder").Builder;
const BigNumber = require('bignumber.js');
const EthereumTx = require('ethereumjs-tx');
const Old = require('old');


class EthermintBuilder extends Builder {
    buildTx(tx) {
        let req = super.buildParam(tx);
        let ether = new BigNumber(10e+17);
        let rawTx = new EthermintMsg(req.fees[0].amount, new BigNumber(req.coins[0].amount).times(ether), 21000, req.to, req.acc.sequence);
        rawTx.ValidateBasic();
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

class EthermintMsg extends Builder.SignMsg {
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

    ValidateBasic() {
        if(this.gasPrice <= 0){
            throw new Error("gasPrice must be more than 0");
        }

        if(this.value <= 0){
            throw new Error("value must be more than 0");
        }

        if(this.gasLimit <= 0){
            throw new Error("gasLimit must be more than 0");
        }

        if(!this.to || this.to.length ==0 ){
            throw new Error("to is empty");
        }

        if(!this.nonce || this.to.nonce ==0 ){
            throw new Error("nonce is empty");
        }
    }
}

module.exports = Old(EthermintBuilder);