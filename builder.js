'use strict';

const Constants = require('./util/constants');

class Builder {

    /**
     * (冷钱包)
     *
     * 构造需要签名的交易内容,得到签名对象后，调用GetSignBytes()方法获取签名字符串
     *
     * @param tx {blockChainThriftModel.Tx} 请求内容
     * @returns {*}
     */
    buildTx(tx) {
        throw new Error("not implement");
    }


    /**
     * (冷钱包)
     *
     * 根据请求内容构造交易并对交易进行签名
     *
     * @param tx {*}
     * @param privateKey {string} 交易发送方私钥(hex编码)，冷钱包提供
     * @returns {StdTx} 交易
     */
    signTx(tx,privateKey) {
        throw new Error("not implement");
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
        throw new Error("not implement");
    }

    /**
     * builder 构建方法，返回具体实现类
     *
     * @param chainName 链名字
     * @returns {*} 具体实现(iris_builder | ethermint_builder)
     */
    static getBuilder(chainName) {
        switch (chainName) {
            case Constants.Chains.IRIS: {
                return require('./chains/iris/iris_builder')();
            }
            case Constants.Chains.ETHERMINT: {
                return require('./chains/ethermint/ethermint_builder')();
            }
            default: {
                throw new Error("not correct chain");
            }
        }
    };

    /**
     * 将外部请求参数封装为crypto统一类型，与具体业务代码松耦合.由具体子类调用
     *
     * @param tx {blockChainThriftModel.Tx} 传入参数
     * @returns {{acc, to, coins, fees, gas, type}}
     */
    buildParam(tx){
        if (!tx.amount || tx.amount.length == 0) {
            throw new Error("amount not empty");
        }

        if (!tx.sender.addr || tx.sender.addr.length == 0) {
            throw new Error("sender not empty");
        }


        if (!tx.sequence) {
            throw new Error("sequence not empty");
        }

        let convert = function (tx) {
            let coins = [];
            tx.amount.forEach(function (item) {
                coins.push({
                    "denom":item.denom,
                    "amount":item.amount,
                });
            });

            let fees = [];
            fees.push({
                "denom":tx.fee.denom,
                "amount":tx.fee.amount,
            });

            return {
                "acc": new Account(tx.sender.addr, tx.sender.chain, tx.ext, tx.sequence),
                "to": tx.receiver.addr,
                "coins": coins,
                "fees": fees,
                "gas": tx.gas,
                "type": tx.type
            }
        };

        return convert(tx);
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

module.exports = Builder;