'use strict';

const Config = require('../config');

class Crypto {

    /**
     * 创建账户
     *
     * @param (language:string} 字符集 (constants.Language.CH_S | constants.Language.JP |constants.Language.SP |constants.Language.EN |)
     * @returns {{address, phrase, privateKey, publicKey}}
     */
    create(language) {
        throw new Error("not implement");
    }

    /**
     * 通过助记词恢复账户
     *
     * @param (seedphrase:string} 助记词
     * @param (language:string} 字符集 (constants.Language.CH_S | constants.Language.JP |constants.Language.SP |constants.Language.EN |)
     * @returns {{address, phrase, privateKey, publicKey}}
     */
    recover(seedphrase, language) {
        throw new Error("not implement");
    }

    /**
     * 通过私钥恢复账户
     *
     * @param (privateKey:string('hex')} 助记词
     * @returns {{address, privateKey, publicKey}}
     */
    import(privateKey) {
        throw new Error("not implement");
    }

    /**
     * 验证地址是否合法
     *
     * @param (address:string('hex')} 账户地址
     * @returns {true | false}
     */
    isValidAddress(address) {
        throw new Error("not implement");
    }

    /**
     * 验证私钥是否合法
     *
     * @param (privateKey:string('hex')} 私钥
     *
     * @returns {true | false}
     */
    isValidPrivate(privateKey) {
        throw new Error("not implement");
    }

    /**
     * 通过公钥获取地址(bech32)
     *
     * @param (publicKey:string('hex')} 公钥
     */
    getAddress(publicKey) {
        throw new Error("not implement");
    }

    /**
     * export keystore data from private and password
     * @param privateKeyHex user's private key
     * @param password user's password
     */
    exportKeystore(privateKeyHex,password){
        throw new Error("not implement");
    }

    /**
     * import keystore from keystore data and password
     * @param keystore user's keystore file
     * @param password user's password
     */
    importKeystore(keystore, password){
        throw new Error("not implement");
    }

    /**
     * getCrypto 构建方法，返回具体实现类
     *
     * @param chain 链名字
     * @returns {*} 具体实现(iris_crypto | ethermint_crypto)
     */
    static getCrypto(chain) {
        switch (chain) {
            case Config.chain.iris: {
                return require('./chains/iris/crypto')();
            }
            case Config.chain.ethermint: {
                return require('./chains/ethermint/ethermint_crypto')();
            }
            case Config.chain.cosmos: {
                return require('./chains/cosmos/crypto')();
            }
            default: {
                throw new Error("not correct chain");
            }
        }

    };
}

module.exports = Crypto;
