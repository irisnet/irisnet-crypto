'use strict';

const Builder = require("../../builder");
const BigNumber = require('bignumber.js');
const EthereumTx = require('ethereumjs-tx');


class EthermintBuilder extends Builder{
    // buildSignMsg(tx) {
    //     let ether = new BigNumber(10e+17);
    //     let rawTx = {
    //         gasPrice: tx.fees,
    //         value: new BigNumber(tx.count).times(ether),
    //         gasLimit: 21000,
    //         to: tx.to,
    //         nonce:tx.sequence
    //     };
    //     return rawTx;
    // }
    //
    // buildTx(tx,signMsg,publicKey) {
    //     throw new Error("not implement");
    // }

    buildAndSignTx(tx, privateKey) {
        let ether = new BigNumber(10e+17);
        let rawTx = {
            gasPrice: tx.fee.amount,
            value: new BigNumber(tx.amount[0].amount).times(ether),
            gasLimit: 21000,
            to: tx.receiver.addr,
            nonce:tx.sequence
        };

        let ethereumTx = new EthereumTx(rawTx);
        ethereumTx.sign(new Buffer(privateKey));
        let serializedTx = ethereumTx.serialize()
        return serializedTx.toString('hex');
    }

}