'use strict';

const Constants = require('./common/constants');

class Builder {
    buildSignMsg(tx) {
        throw new Error("not implement");
    }

    buildTx(tx,signMsg,publicKey) {
        throw new Error("not implement");
    }

    buildAndSignTx(tx, privateKey) {
        throw new Error("not implement");
    }

    //静态方法,直接调用
    static getBuilder(chainName) {
        switch (chainName) {
            case Constants.Chains.IRIS: {
                let builder = require('./chains/iris/iris_builder')();
                return builder
            }
            default: {
                return new Builder();
            }
        }
    };
}

module.exports = Builder;