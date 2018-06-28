'use strict';

const Constants = require('./common/constants');

class Crypto {
    create(language) {
        throw new Error("not implement");
    }

    recover(seedphrase, language) {
        throw new Error("not implement");
    }

    import(privateKey) {
        throw new Error("not implement");
    }

    isValidAddress(address) {
        throw new Error("not implement");
    }

    isValidPrivate(privateKey) {
        throw new Error("not implement");
    }

    //静态方法,直接调用
    static getCrypto(chain) {
        switch (chain) {
            case Constants.Chains.IRIS: {
                return require('./chains/iris/iris_crypto')();
            }
            case Constants.Chains.ETHERMINT: {
                return require('./chains/ethermint/ethermint_crypto')();
            }
            default: {
                throw new Error("not correct chain");
            }
        }

    };
}

module.exports = Crypto;
