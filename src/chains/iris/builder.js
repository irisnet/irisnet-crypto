'use strict';
const Builder = require("../../builder").Builder;
const Old = require('old');
const Bank = require('./bank');
const Stake = require('./stake');
const Distribution = require('./distribution');
const Gov = require('./gov');
const Coinswap = require('./coinswap');
const IrisKeypair = require('./keypair');
const Codec = require("../../util/codec");
const Config = require('../../../config');
const Utils = require("../../util/utils");

class IrisBuilder extends Builder {


    /**
     * 构造签名内容
     *
     * @param tx  请求内容
     * @returns {StdTx}
     */
    buildTx(tx) {
        let req = super.buildParam(tx);
        let msg;
        switch (req.type) {
            case Config.iris.tx.transfer.type: {
                msg = Bank.createMsgSend(req);
                break;
            }
            case Config.iris.tx.delegate.type: {
                msg = Stake.createMsgDelegate(req);
                break;
            }
            case Config.iris.tx.undelegate.type: {
                msg = Stake.createMsgBeginUnbonding(req);
                break;
            }
            case Config.iris.tx.redelegate.type: {
                msg = Stake.createMsgBeginRedelegate(req);
                break;
            }
            case Config.iris.tx.withdrawDelegationRewardsAll.type: {
                msg = Distribution.createMsgWithdrawDelegatorRewardsAll(req);
                break;
            }
            case Config.iris.tx.withdrawDelegationReward.type: {
                msg = Distribution.createMsgWithdrawDelegatorReward(req);
                break;
            }
            case Config.iris.tx.deposit.type: {
                msg = Gov.createMsgDeposit(req);
                break;
            }
            case Config.iris.tx.vote.type: {
                msg = Gov.createMsgVote(req);
                break;
            }
            case Config.iris.tx.addLiquidity.type: {
                msg = Coinswap.createMsgAddLiquidity(req);
                break;
            }
            case Config.iris.tx.removeLiquidity.type: {
                msg = Coinswap.createMsgRemoveLiquidity(req);
                break;
            }
            case Config.iris.tx.swapOrder.type: {
                msg = Coinswap.createMsgSwapOrder(req);
                break;
            }
            default: {
                throw new Error("not exist tx type");
            }
        }
        let stdFee = Bank.NewStdFee(req.fees, req.gas);
        let signMsg = Bank.NewStdSignMsg(req.chain_id, req.account_number, req.sequence, stdFee, msg, req.memo, req.type);
        signMsg.ValidateBasic();
        return Bank.NewStdTx(signMsg);
    }

    /**
     * 签名交易数据
     *
     * @param data
     * @param privateKey
     * @returns {}
     */
    sign(data, privateKey) {
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        let signbyte = IrisKeypair.sign(privateKey, data);
        let keypair = IrisKeypair.import(privateKey);

        return {
            pub_key:Codec.Hex.hexToBytes(keypair.publicKey),
            signature:signbyte
        }
    }

    /**
     * (热钱包)
     *
     * 根据请求内容构造交易并对交易进行签名
     *
     * @param tx  请求内容
     * @param privateKey 发送方账户私钥
     * @returns {StdTx}  交易
     */
    buildAndSignTx(tx, privateKey) {
        let stdTx = this.buildTx(tx);
        let mode = tx.mode ? tx.mode : Config.iris.mode.normal;
        let signature;
        if (mode === Config.iris.mode.normal) {
            if (Utils.isEmpty(privateKey)) {
                throw new Error("privateKey is  empty");
            }
            signature = this.sign(stdTx.GetSignBytes(),privateKey);
            stdTx.SetSignature(signature);
        }
        return stdTx
    }
}
module.exports = Old(IrisBuilder);
