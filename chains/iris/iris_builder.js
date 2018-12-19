'use strict';
const Builder = require("../../builder").Builder;
const Old = require('old');
const Bank = require('./bank');
const Stake = require('./stake');
const Distribution = require('./distribution');
const IrisKeypair = require('./iris_keypair');
const Codec = require("../../util/codec");
const Utils = require('../../util/utils');
const Config = require('../../config');

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
            case Config.iris.tx.transfer.type: {
                msg = Bank.CreateMsgSend(req);
                break;
            }
            case Config.iris.tx.delegate.type: {
                msg = Stake.GreateMsgDelegate(req);
                break;
            }
            case Config.iris.tx.unbond.type: {
                msg = Stake.CreateMsgBeginUnbonding(req);
                break;
            }
            case Config.iris.tx.redelegate.type: {
                msg = Stake.CreateMsgBeginRedelegate(req);
                break;
            }
            case Config.iris.tx.setWithdrawAddress.type: {
                msg = Distribution.GreateMsgSetWithdrawAddress(req);
                break;
            }
            case Config.iris.tx.withdrawDelegationRewardsAll.type: {
                msg = Distribution.GreateMsgWithdrawDelegatorRewardsAll(req);
                break;
            }
            case Config.iris.tx.withdrawDelegationReward.type: {
                msg = Distribution.GreateMsgWithdrawDelegatorReward(req);
                break;
            }
            default: {
                throw new Error("not exist tx type");
            }
        }
        let stdFee = Bank.NewStdFee(req.fees, req.gas);
        let signMsg = Bank.NewStdSignMsg(req.chain_id, req.account_number, req.sequence, stdFee, msg, req.memo,req.type);
        signMsg.ValidateBasic();
        return signMsg
    }

    /**
     * 对buildTx构造的交易进行签名，注意入参必须是buildTx的结果.
     *
     * @param tx {StdSignMsg} 字符串
     * @param privateKey
     * @returns {StdTx}
     */
    signTx(tx, privateKey) {
        let signMsg = CreateSignMsg(tx);
        let signbyte = IrisKeypair.sign(privateKey, signMsg.GetSignBytes());
        let keypair = IrisKeypair.import(privateKey);
        let signs = [Bank.NewStdSignature(Codec.Hex.hexToBytes(keypair.publicKey), signbyte, signMsg.account_number, signMsg.sequence)];
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
        let signs = [Bank.NewStdSignature(Codec.Hex.hexToBytes(keypair.publicKey), signbyte, signMsg.account_number, signMsg.sequence)];
        let stdTx = Bank.NewStdTx(signMsg.msgs, signMsg.fee, signs, signMsg.memo);
        return stdTx
    }
}

function CreateSignMsg(properties) {
    let prop = JSON.parse(properties);
    let msg;
    let msgType = prop.type;
    switch (msgType) {
        case Config.iris.tx.transfer.type: {
            msg = Bank.Create(prop.msgs[0]);
            break;
        }
        case Config.iris.tx.delegate.type: {
            msg = Stake.MsgDelegate().Create(prop.msgs[0].value);
            break;
        }
        case Config.iris.tx.unbond.type: {
            msg = Stake.MsgBeginUnbonding().Create(prop.msgs[0]);
            break;
        }
        case Config.iris.tx.redelegate.type: {
            msg = Stake.MsgBeginRedelegate().Create(prop.msgs[0]);
            break;
        }
        case Config.iris.tx.setWithdrawAddress.type: {
            msg = Distribution.MsgSetWithdrawAddress().Create(prop.msgs[0]);
            break;
        }
        case Config.iris.tx.withdrawDelegationRewardsAll.type: {
            msg = Distribution.MsgWithdrawDelegatorRewardsAll().Create(prop.msgs[0]);
            break;
        }
        case Config.iris.tx.withdrawDelegationReward.type: {
            msg = Distribution.MsgWithdrawDelegatorReward().Create(prop.msgs[0]);
            break;
        }
        default: {
            throw new Error("not exist tx type");
        }
    }
    let stdFee = Bank.NewStdFee(prop.fee.amount, parseInt(prop.fee.gas));
    return Bank.NewStdSignMsg(prop.chain_id, parseInt(prop.account_number), parseInt(prop.sequence), stdFee, msg, prop.memo);
}

module.exports = Old(IrisBuilder);