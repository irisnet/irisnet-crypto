'use strict';
const Builder = require("../../builder").Builder;
const Old = require('old');
const Constants = require('./constants');
const Bank = require('./bank');
const Stake = require('./stake');
const Distribution = require('./distribution');
const IrisKeypair = require('./iris_keypair');
const Codec = require("../../util/codec");
const Utils = require('../../util/utils');

class IrisBuilder extends Builder {


    /**
     * 构造签名内容(如果是硬件钱包，请将返回结果中的msg传递给硬件钱包)
     *
     * @param tx  请求内容
     * @returns {StdSignMsg}
     */
    buildTx(tx) {
        let req = super.buildParam(tx);
        let msg;
        switch (req.type) {
            case Constants.TxType.TRANSFER: {
                msg = Bank.CreateMsgSend(req);
                break;
            }
            case Constants.TxType.DELEGATE: {
                msg = Stake.GreateMsgDelegate(req);
                break;
            }
            case Constants.TxType.BEGINUNBOND: {
                msg = Stake.CreateMsgBeginUnbonding(req);
                break;
            }
            case Constants.TxType.BEGINREdELEGATE: {
                msg = Stake.CreateMsgBeginRedelegate(req);
                break;
            }
            case Constants.TxType.SET_WITHDRAW_ADDRESS: {
                msg = Distribution.GreateMsgSetWithdrawAddress(req);
                break;
            }
            case Constants.TxType.WITHDRAW_DELEGATION_REWARD_ALL: {
                msg = Distribution.GreateMsgWithdrawDelegatorRewardsAll(req);
                break;
            }
            case Constants.TxType.WITHDRAW_DELEGATION_REWARD: {
                msg = Distribution.GreateMsgWithdrawDelegatorReward(req);
                break;
            }
            default: {
                throw new Error("not exist tx type");
            }
        }
        let stdFee = Bank.NewStdFee(req.fees, req.gas);
        let signMsg = Bank.NewStdSignMsg(req.chain_id, req.account_number, req.sequence, stdFee, msg,req.memo);
        signMsg.ValidateBasic();
        return signMsg
    }

    /**
     * 对buildTx构造的交易进行签名，注意入参必须是buildTx的结果.
     *
     * @param tx {StdSignMsg}
     * @param privateKey
     * @returns {StdTx}
     */
    signTx(tx,privateKey) {
        // let signMsg = tx;
        // let sig = signMsg.signByte;
        let signMsg = CreateSignMsg(tx);
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
        console.log(JSON.stringify(signMsg.GetSignBytes()));
        let signbyte = IrisKeypair.sign(privateKey, signMsg.GetSignBytes());
        let keypair = IrisKeypair.import(privateKey);
        let signs = [Bank.NewStdSignature(Codec.Hex.hexToBytes(keypair.publicKey), signbyte, signMsg.accnum, signMsg.sequence)];
        let stdTx = Bank.NewStdTx(signMsg.msgs, signMsg.fee, signs, signMsg.memo);
        return stdTx
    }
}

function CreateSignMsg(properties){
    let prop = JSON.parse(properties);
    let msg = prop.msgs[0];
    if(!Utils.isEmpty(msg.inputs)) {
        msg = Bank.Create(msg)
    }else if(!Utils.isEmpty(msg.delegation)){
        msg = Stake.MsgDelegate().Create(msg)
    }else if(!Utils.isEmpty(msg.shares_amount)){
        msg = Stake.MsgBeginUnbonding().Create(msg)
    }else if(!Utils.isEmpty(msg.validator_src_addr)){
        msg = Stake.MsgBeginRedelegate().Create(msg)
    }
    let stdFee = Bank.NewStdFee(prop.fee.amount, parseInt(prop.fee.gas));
    return Bank.NewStdSignMsg(prop.chain_id, parseInt(prop.account_number), parseInt(prop.sequence), stdFee, msg,prop.memo);
}

module.exports = Old(IrisBuilder);