'use strict';
const Crypto = require("../../crypto");
const EthUtil = require('ethereumjs-util');
const Hex = require("../../common/hex");
const EthermintKeypair = require('../../common/ethermint_keypair');

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
}

module.exports = old(EthermintCrypto);