'use strict';

const Config = require('../config');
const Utils = require('./util/utils');

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
     * @param data {*}
     * @param privateKey {string} 交易发送方私钥(hex编码)，冷钱包提供
     * @returns {StdSignature} 交易
     */
    sign(data,privateKey) {
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
            case Config.chain.iris: {
                return require('./chains/iris/builder')();
            }
            case Config.chain.ethermint: {
                return require('./chains/ethermint/ethermint_builder')();
            }
            case Config.chain.cosmos: {
                return require('./chains/cosmos/builder')();
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
        let convert = function (tx) {
            let fees = [];
            if (!Utils.isEmpty(tx.fees)){
                fees.push({
                    "denom":tx.fees.denom,
                    "amount":Utils.toString(tx.fees.amount),
                });
            }
            let memo = tx.memo ? tx.memo : '';
            return new Request(tx.chain_id,tx.from,tx.account_number,tx.sequence,fees,tx.gas,memo,tx.type,tx.msg);
        };

        return convert(tx);
    }
}

class Request {
    constructor(chain_id, from, account_number,sequence, fees,gas,memo,type,msg) {
        if (Utils.isEmpty(chain_id)) {
            throw new Error("chain_id is empty");
        }
        if (Utils.isEmpty(from)) {
            throw new Error("from is empty");
        }
        if (account_number < 0) {
            throw new Error("account_number is empty");
        }
        if (sequence < 0) {
            throw new Error("sequence is empty");
        }
        if (Utils.isEmpty(fees)) {
            throw new Error("fees is empty");
        }
        if (Utils.isEmpty(type)) {
            throw new Error("type is empty");
        }

        this.chain_id = chain_id;
        this.from = from;
        this.account_number = account_number;
        this.sequence = sequence;
        this.fees = fees;
        this.gas = gas;
        this.memo = memo;
        this.type = type;
        this.msg = msg
    }
}

/**
 * 校验器接口
 *
 */
class Validator{
    ValidateBasic() {
        throw new Error("not implement");
    }
}

/**
 * 签名消息接口
 *
 */

class Msg extends Validator{
    GetSignBytes() {
        throw new Error("not implement");
    }

    Type() {
        throw new Error("not implement");
    }
    constructor(type) {
        super();
        this.type = type
    }
    GetMsg(){
        throw new Error("not implement");
    }

    GetDisplayContent(){
        throw new Error("not implement");
    }
}

module.exports = {Builder,Msg,Validator};