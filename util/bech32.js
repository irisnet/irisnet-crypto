'use strict';

const Hex = require("./hex");
const BECH32 = require('bech32');

class Bech32 {
    /**
     *
     * @param bech32Str  使用bech32编码后的字符串
     * @returns {string} 大写的hex字符串
     */
    static fromBech32(bech32Str) {
        let ownKey = BECH32.decode(bech32Str);
        return Hex.bytesToHex(BECH32.fromWords(ownKey.words)).toUpperCase();
    }

    /**
     *
     * @param prefix bech32编码前缀
     * @param str    待编码的字符串
     * @returns {*}  bech32编码后的字符串
     */
    static toBech32(prefix, str) {
        let strByte = BECH32.toWords(Buffer.from(str, 'hex'))
        return BECH32.encode(prefix, strByte)
    }
}

module.exports = Bech32;