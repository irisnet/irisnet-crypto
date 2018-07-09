'use strict';
const Crypto = require("../../crypto");
const Old = require('old');
const EthermintKeypair = require('./ethermint_keypair');

class EthermintCrypto extends Crypto {
    constructor() {
        super()
    }

    create(language) {
        throw new Error("not implement");
    }

    recover(seedphrase, language) {
        throw new Error("not implement");
    }

    import(secret) {
        return EthermintKeypair.Import(secret);
    }

    isValidAddress(address) {
        return EthermintKeypair.isValidAddress(address);
    }

    isValidPrivate(privateKey) {
        return EthermintKeypair.isValidPrivate(new Buffer(Hex.hexToBytes(privateKey)));
    }

    getAddress(publicKey) {
        return EthermintKeypair.getAddress(publicKey);
    }
}

module.exports = Old(EthermintCrypto);