'use strict';
const Builder = require("../../builder");
const Old = require('old');
const Constants = require('../../common/constants');
const Bank = require('./x/bank');
const Stake = require('./x/stake');
const CosmosKeypair = require('../../common/cosmos_keypair');
const Hex = require("../../common/hex");

class IrisBuilder extends Builder {
    constructor() {
        super()
    }

    /**
     * (冷钱包)
     *
     * 构造需要签名的交易内容,得到签名对象后，调用Bytes()方法获取签名字符串
     *
     * @param tx {blockChainThriftModel.Tx} 请求内容
     * @returns {StdSignMsg}
     */
    buildSignMsg(tx) {
        let req = convert(tx);

        switch (req.type) {
            case Constants.TxType.TRANSFER: {
                return Bank.getTransferSignMsg(req.acc, req.to, req.coins, req.fee, req.gas)
            }
            case Constants.TxType.DELEGATE: {
                return Stake.getDelegateSignMsg(req.acc, req.to, req.coins[0], req.fee, req.gas)
            }
            case Constants.TxType.UNBOND: {
                let share = req.coins[0].amount;
                return Stake.getUnbondSignMsg(req.acc, req.to, share, req.fee, req.gas)
            }
            default: {
                throw new Error("not exist tx type");
            }
        }
    }

    /**
     * (冷钱包)
     *
     * 根据请求内容构造交易并对交易进行签名
     *
     * @param tx {blockChainThriftModel.Tx} 请求内容
     * @param signByte {[]byte} 签名后的byte数组
     * @param publicKey {string} 交易发送方公钥(hex编码)
     * @returns {StdTx} 交易
     */
    buildTx(tx,signByte,publicKey) {
        let signMsg = this.buildSignMsg(tx);
        let signs = [new Bank.StdSignature(Hex.hexToBytes(publicKey), signByte, signMsg.accnum[0], signMsg.sequence[0])];
        let stdTx = new Bank.StdTx(signMsg.msg, signMsg.fee, signs, tx.type);
        console.log(JSON.stringify(stdTx));
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
        let signMsg = this.buildSignMsg(tx);
        let signbyte = CosmosKeypair.sign(privateKey, signMsg.GetSignBytes());
        let keypair = CosmosKeypair.import(privateKey);
        let signs = [new Bank.StdSignature(Hex.hexToBytes(keypair.publicKey), signbyte, signMsg.accnum[0], signMsg.sequence[0])];
        let stdTx = new Bank.StdTx(signMsg.msg, signMsg.fee, signs, tx.type);
        return stdTx
    }
}

let convert = function (tx) {
    if (!tx.amount || tx.amount.length == 0) {
        throw new Error("amount not empty");
    }
    let coins = [];
    tx.amount.forEach(function (item, index, arr) {
        coins.push(new Bank.Coin(item.amount, item.denom));
    });
    let fees = [];
    fees.push(new Bank.Coin(tx.fee.amount, tx.fee.denom));

    return {
        "acc": new Account(tx.sender.addr, tx.sender.chain, tx.ext, tx.sequence),
        "to": tx.receiver.addr,
        "coins": coins,
        "fees": fees,
        "gas": tx.gas,
        "type": tx.type
    }
}

class Account {
    constructor(address, chain_id, account_number, sequence) {
        this.address = address;
        this.chain_id = chain_id;
        this.account_number = account_number;
        this.sequence = sequence
    }
}

module.exports = Old(IrisBuilder);