'use strict';
const Builder = require("../../builder").Builder;
const Old = require('old');
const Constants = require('./constants');
const Bank = require('./bank');
const Stake = require('./stake');
const IrisKeypair = require('./iris_keypair');
const Hex = require("../../util/hex");
const Bech32 = require("../../util/bech32");

class IrisBuilder extends Builder {


    /**
     * 构造签名内容(如果是硬件钱包，请将返回结果中的msg传递给硬件钱包)
     *
     * @param tx {blockChainThriftModel.Tx} 请求内容
     * @returns {{msg: StdSignMsg, type: string}}
     */
    buildTx(tx) {
        let req = super.buildParam(tx);

        //如果tx中交易地址是bech32格式，转化为Hex格式
        if (!IrisKeypair.isValidAddress(req.acc.address)){
            req.acc.address = Bech32.fromBech32(req.acc.address);
        }
        if (!IrisKeypair.isValidAddress(req.to)){
            req.to = Bech32.fromBech32(req.to);
        }

        let msg;
        switch (req.type) {
            case Constants.TxType.TRANSFER: {
                msg = Bank.getTransferSignMsg(req.acc, req.to, req.coins, req.fees, req.gas);
                break;
            }
            case Constants.TxType.DELEGATE: {
                msg = Stake.getDelegateSignMsg(req.acc, req.to, req.coins[0], req.fees, req.gas);
                break;
            }
            case Constants.TxType.UNBOND: {
                let share = req.coins[0].amount;
                msg = Stake.getUnbondSignMsg(req.acc, req.to, share, req.fees, req.gas);
                break;
            }
            default: {
                throw new Error("not exist tx type");
            }
        }
        msg.ValidateBasic();
        return {
            msg : msg,
            type:req.type
        }
    }

    /**
     * 对buildTx构造的交易进行签名，注意入参必须是buildTx的结果.
     *
     * @param tx {{msg: StdSignMsg, type: string}}
     * @param privateKey
     * @returns {StdTx}
     */
    signTx(tx,privateKey) {
        let signMsg = tx.msg;
        let signbyte = IrisKeypair.sign(privateKey, signMsg.GetSignBytes());
        let keypair = IrisKeypair.import(privateKey);
        let signs = [new Bank.StdSignature(Hex.hexToBytes(keypair.publicKey), signbyte, signMsg.accnum[0], signMsg.sequence[0])];
        let stdTx = new Bank.StdTx(signMsg.msg, signMsg.fee, signs, tx.type);
        return stdTx
    }

    /**
     * (热钱包)
     *
     * 根据请求内容构造交易并对交易进行签名
     *
     * @param tx {blockChainThriftModel.Tx} 请求内容
     * @param privateKey 发送方账户私钥
     * @returns {StdTx}  交易
     */
    buildAndSignTx(tx, privateKey) {
        let signMsg = this.buildTx(tx).msg;
        let signbyte = IrisKeypair.sign(privateKey, signMsg.GetSignBytes());
        let keypair = IrisKeypair.import(privateKey);
        let signs = [new Bank.StdSignature(Hex.hexToBytes(keypair.publicKey), signbyte, signMsg.accnum[0], signMsg.sequence[0])];
        let stdTx = new Bank.StdTx(signMsg.msg, signMsg.fee, signs, tx.type);
        return stdTx
    }
}

module.exports = Old(IrisBuilder);