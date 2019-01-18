'use strict';

const Codec = require("../../util/codec");
const Sha256 = require("sha256");
const Config = require('../../config');
const root = require('./tx/tx');

/**
 * 处理amino编码（目前支持序列化）
 *
 */
class Amino {
    constructor() {
        this._keyMap = {};
    }

    /**
     */

    GetRegisterInfo(key) {
        let info = this._keyMap[key];
        if (info === undefined) {
            throw new Error("not Registered");
        }
        return info
    }

    /**
     * 注册amino类型
     *
     * @param class field的类型
     * @param key amino前缀
     */
    RegisterConcrete(type, key) {

        this._keyMap[key] = {
            prefix: this._aminoPrefix(key),
            classType: type
        }
    }

    /**
     * 给消息加上amino前缀
     *
     * @param key amino前缀
     * @param message 编码msg
     * @returns { Array }
     */
    MarshalBinary(key, message) {
        let prefixBytes = this._keyMap[key].prefix;
        prefixBytes = Buffer.from(prefixBytes.concat(message.length));
        prefixBytes = Buffer.concat([prefixBytes, message]);
        return prefixBytes
    }

    MarshalJSON(key, message) {
        let pair = {
            "type": key,
            "value": message
        };
        return pair
    }

    _aminoPrefix(name) {
        let a = Sha256(name);
        let b = Codec.Hex.hexToBytes(a);
        while (b[0] === 0) {
            b = b.slice(1, b.length - 1)
        }
        b = b.slice(3, b.length - 1);
        while (b[0] === 0) {
            b = b.slice(1, b.length - 1)
        }
        b = b.slice(0, 4);//注意和go-amino v0.6.2以前的不一样
        return b
    }
}

let amino = new Amino();
amino.RegisterConcrete(null, Config.iris.amino.pubKey);
amino.RegisterConcrete(null, Config.iris.amino.signature);
amino.RegisterConcrete(root.irisnet.tx.MsgDelegate, Config.iris.tx.delegate.prefix);
amino.RegisterConcrete(root.irisnet.tx.MsgSend, Config.iris.tx.transfer.prefix);
amino.RegisterConcrete(root.irisnet.tx.MsgBeginRedelegate, Config.iris.tx.redelegate.prefix);
amino.RegisterConcrete(root.irisnet.tx.MsgBeginUnbonding, Config.iris.tx.unbond.prefix);
amino.RegisterConcrete(root.irisnet.tx.MsgWithdrawDelegatorRewardsAll, Config.iris.tx.withdrawDelegationRewardsAll.prefix);
amino.RegisterConcrete(root.irisnet.tx.MsgWithdrawDelegatorReward, Config.iris.tx.withdrawDelegationReward.prefix);
amino.RegisterConcrete(root.irisnet.tx.StdTx, Config.iris.tx.stdTx.prefix);
module.exports = amino;