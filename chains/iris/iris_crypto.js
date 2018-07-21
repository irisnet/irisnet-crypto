'use strict';
const Crypto = require("../../crypto");
const Old = require('old');
const IrisKeypair = require('./iris_keypair');
const Wordcodec = require('../../util/wordcodec');
const Hex = require('../../util/hex');
const Bech32 = require('../../util/bech32');
const Constants = require('./constants');


class IrisCrypto extends Crypto {
    
    /**
     *
     * @param language
     * @returns {*}
     */
    create(language) {
        let keyPair = IrisKeypair.create();
        if (keyPair) {
            return {
                address: keyPair.address,
                phrase: keyPair.secret,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey
            };
        }
        return keyPair;
    }

    recover(secret, language) {
        let keyPair = IrisKeypair.recover(secret)
        if (keyPair) {
            return {
                address: keyPair.address,
                phrase: secret,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey
            };
        }
    }

    import(privateKey) {
        let keyPair = IrisKeypair.import(privateKey);
        if (keyPair) {
            return {
                address: keyPair.address,
                phrase: null,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey
            };
        }
    }

    isValidAddress(address) {
        return IrisKeypair.isValidAddress(address);
    }

    isValidPrivate(privateKey) {
        return IrisKeypair.isValidPrivate(privateKey);
    }

    getAddress(publicKey) {
        let pubKey = Hex.hexToBytes(publicKey);
        let address = IrisKeypair.getAddress(pubKey);
        address = Bech32.toBech32(Constants.IrisNetConfig.PREFIX_BECH32_ACCADDR, address);
        return address;
    }
}

module.exports = Old(IrisCrypto);