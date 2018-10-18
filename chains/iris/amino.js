'use strict';

const Codec = require("../../util/codec");
const Sha256 = require("sha256");
const Constants = require('./constants');

/**
 * 处理amino编码（目前支持序列化）
 *
 */
class Amino {
    constructor(){
        this._keyMap = {};
    }

    /**
     */

    GetCode(key){
        let code = this._keyMap[key];
        if (code === "" || code === undefined){
            throw new Error("not implement");
        }
        return code
    }
    /**
     * 注册消息的amino前缀
     *
     * @param key amino前缀
     */
    RegisterConcrete(key){
        this._keyMap[key] = this._aminoPrefix(key)
    }

    /**
     * 给消息加上amino前缀
     *
     * @param key amino前缀
     * @param message 编码msg
     * @returns { Array }
     */
    MarshalBinary(key,message){
        let prefixBytes = this._keyMap[key];
        prefixBytes = Buffer.from(prefixBytes.concat(message.length));
        prefixBytes = Buffer.concat([prefixBytes,message]);
        return prefixBytes
    }

    MarshalJSON(key,message){
        let pair = {
            "type" : key,
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
amino.RegisterConcrete(Constants.AminoKey.SignatureSecp256k1_prefix);
amino.RegisterConcrete(Constants.AminoKey.PubKeySecp256k1_prefix);
amino.RegisterConcrete("cosmos-sdk/MsgDelegate");
amino.RegisterConcrete("cosmos-sdk/Send");
amino.RegisterConcrete("auth/StdTx");

module.exports = amino;