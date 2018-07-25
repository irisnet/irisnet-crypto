'use strict';
const Builder = require("../../builder").Builder;
const Old = require('old');
const Constants = require('./constants');
const Bank = require('./bank');
const Stake = require('./stake');
const IrisKeypair = require('./iris_keypair');
const Codec = require("../../util/codec");

class IrisBuilder extends Builder {


    /**
     * 构造签名内容(如果是硬件钱包，请将返回结果中的msg传递给硬件钱包)
     *
     * @param tx {blockChainThriftModel.Tx} 请求内容
     * @returns {StdSignMsg}
     */
    buildTx(tx) {
        let req = super.buildParam(tx);

        //将from和to由hex编码转化为bech32编码
        if (Codec.Hex.isHex(req.acc.address)) {
            req.acc.address = Codec.Bech32.toBech32(Constants.IrisNetConfig.PREFIX_BECH32_ACCADDR, req.acc.address);
        }
        if (Codec.Hex.isHex(req.to)) {
            req.to =  Codec.Bech32.toBech32(Constants.IrisNetConfig.PREFIX_BECH32_ACCADDR,req.to)
        }

        let msg;
        switch (req.type) {
            case Constants.TxType.TRANSFER: {
                msg = Bank.GetTransferSignMsg(req.acc, req.to, req.coins, req.fees, req.gas, req.memo);
                break;
            }
            case Constants.TxType.DELEGATE: {
                msg = Stake.GetDelegateSignMsg(req.acc, req.to, req.coins[0], req.fees, req.gas, req.memo);
                break;
            }
            case Constants.TxType.BEGINUNBOND: {
                let share = req.coins[0].amount;
                msg = Stake.GetBeginUnbondingMsg(req.acc, req.to, share, req.fees, req.gas, req.memo);
                break;
            }
            case Constants.TxType.COMPLETEUNBOND: {
                let share = req.coins[0].amount;
                msg = Stake.GetCompleteUnbondingMsg(req.acc, req.to, share, req.fees, req.gas, req.memo);
                break;
            }
            default: {
                throw new Error("not exist tx type");
            }
        }
        msg.ValidateBasic();
        return msg
    }

    /**
     * 对buildTx构造的交易进行签名，注意入参必须是buildTx的结果.
     *
     * @param tx {StdSignMsg}
     * @param privateKey
     * @returns {StdTx}
     */
    signTx(tx,privateKey) {
        let signMsg = tx;
        let sig = signMsg.GetSignBytes();
        let signbyte = IrisKeypair.sign(privateKey, sig);
        let keypair = IrisKeypair.import(privateKey);
        let signs = [Bank.NewStdSignature(Codec.Hex.hexToBytes(keypair.publicKey), signbyte, signMsg.accnum, signMsg.sequence)];
        let stdTx = Bank.NewStdTx(signMsg.msgs, signMsg.fee, signs, signMsg.memo);
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
        let signMsg = this.buildTx(tx);
        let signbyte = IrisKeypair.sign(privateKey, signMsg.GetSignBytes());
        let keypair = IrisKeypair.import(privateKey);
        let signs = [Bank.NewStdSignature(Codec.Hex.hexToBytes(keypair.publicKey), signbyte, signMsg.accnum, signMsg.sequence)];
        let stdTx = Bank.NewStdTx(signMsg.msgs, signMsg.fee, signs, signMsg.memo);
        return stdTx
    }
}

module.exports = Old(IrisBuilder);