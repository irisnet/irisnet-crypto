'use strict';
const Crypto = require("../../crypto");
const Old = require('old');
const CosmosKeypair = require('../../common/cosmos_keypair');
const Wordcodec = require('../../common/wordcodec');
const Hex = require('../../common/hex');
const Bech32 = require('../../common/bech32');
const Constants = require('../../common/constants');


class IrisCrypto extends Crypto {
    constructor() {
        super()
    }

    /**
     *
     * @param language
     * @returns {*}
     */
    create(language) {
        let keyPair = CosmosKeypair.create();
        if (keyPair) {
            let seed = Wordcodec.BytesToWords(keyPair.secret, language);
            let phrase = seed.toString().replace(/,/g, " ");
            return {
                "address": keyPair.address,
                "phrase": phrase,
                "privateKey": keyPair.privateKey,
                "publicKey": keyPair.publicKey
            };
        }
        return keyPair;
    }

    recover(seedphrase, language) {
        let words = seedphrase.split(" ");
        let secret;
        try {
            secret = Wordcodec.WordsToBytes(words, language);
        } catch (e) {
            return {
                "address": '',
            }
        }
        let keyPair = CosmosKeypair.recover(secret)
        if (keyPair) {
            return {
                "address": keyPair.address,
                "phrase": seedphrase,
                "privateKey": keyPair.privateKey,
                "publicKey": keyPair.publicKey
            };
        }
    }

    import(privateKey) {
        let keyPair = CosmosKeypair.import(privateKey);
        if (keyPair) {
            return {
                "address": keyPair.address,
                "privateKey": keyPair.privateKey,
                "publicKey": keyPair.publicKey
            };
        }
    }

    isValidAddress(address) {
        return CosmosKeypair.isValidAddress(address);
    }

    isValidPrivate(privateKey) {
        return CosmosKeypair.isValidPrivate(privateKey);
    }

    getAddress(publicKey, encoding) {
        let pubKey = Hex.hexToBytes(publicKey);
        let address = CosmosKeypair.getAddress(pubKey);
        if (encoding == Constants.IrisNetConfig.ENCODING_BECH32) {
            address = Bech32.toBech32(Constants.IrisNetConfig.PREFIX_BECH32_ACCADDR, address)
        }
        return address;
    }
}

module.exports = Old(IrisCrypto);