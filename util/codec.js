'use strict';

const BECH32 = require('bech32');

/**
 * 处理编码/解码
 *
 */
class Codec {}


/**
 * 处理hex编码
 *
 * @type {hex}
 */
const hex = class {
    static hexToBytes(hex) {
        let bytes = [];
        for (let c = 0; c < hex.length; c += 2) {
            bytes.push(parseInt(hex.substr(c, 2), 16));
        }
        return bytes;
    }

    static bytesToHex(bytes) {
        let hex = [];
        for (let i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("").toUpperCase();
    }

    static stringToHex(str){
        let bytes = [];
        for(var i = 0; i < str.length; i++){
            bytes.push(str.charCodeAt(i).toString(16));
        }
        return bytes.join("");
    }

    static isHex(str){
        str = str.replace("0x","");
        return /^[0-9a-fA-F]*$/i.test(str);
    }
};

/**
 * 处理bech32编码
 *
 * @type {bech32}
 */
const bech32 = class {
    /**
     *
     * @param bech32Str  使用bech32编码后的字符串
     * @returns {string} 大写的hex字符串
     */
    static fromBech32(bech32Str) {
        let ownKey = BECH32.decode(bech32Str);
        return hex.bytesToHex(BECH32.fromWords(ownKey.words)).toUpperCase();
    }

    /**
     *
     * @param prefix bech32编码前缀
     * @param str    待编码的字符串
     * @returns {*}  bech32编码后的字符串
     */
    static toBech32(prefix, str) {
        let strByte = BECH32.toWords(Buffer.from(str, 'hex'));
        return BECH32.encode(prefix, strByte)
    }

    /**
     *
     * @param prefix bech32编码
     * @param str    待编码的字符串
     * @returns
     */
    static isBech32(prefix, str) {
        if (!prefix || prefix.length == 0) {
            return false
        }

        let preReg = new RegExp('^' + prefix + '1');
        if (!preReg.test(str) ){
            return false
        }

        let allReg = new RegExp(/^[0-9a-zA-Z]*$/i);
        if (!allReg.test(str)){
            return false
        }

        try {
            bech32.fromBech32(str);
            return true
        }catch (e) {
            return false

        }
    }
};

Codec.Hex = hex;
Codec.Bech32 = bech32;

module.exports = Codec;