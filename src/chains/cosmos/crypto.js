'use strict';
const Crypto = require("../../crypto");
const Old = require('old');
const CosmosKeypair = require('./keypair');
const Codec = require("../../util/codec");
const Utils = require("../../util/utils");
const Config = require('../../../config');
const Bip39 = require('bip39');

class CosmosCrypto extends Crypto {
    
    /**
     *
     * @param language
     * @returns {*}
     */
    create(language, mnemonicLength = 24) {
        let keyPair = CosmosKeypair.create(switchToWordList(language), mnemonicLength);
        if (keyPair) {
            return encode({
                address: keyPair.address,
                phrase: keyPair.secret,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey,
            });
        }
        return keyPair;
    }

    /**
     *
     * @param language
     * @param mnemonicLength 12/15/18/21/24
     * @returns mnemonics
     */
    generateMnemonic(language, mnemonicLength = 24) {
        return CosmosKeypair.generateMnemonic(switchToWordList(language), mnemonicLength);
    }

    recover(secret, language, path) {
        path = path || Config.cosmos.bip39Path;
        let keyPair = CosmosKeypair.recover(secret,switchToWordList(language), path);
        if (keyPair) {
            return encode({
                address: keyPair.address,
                phrase: secret,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey
            });
        }
    }

    import(privateKey) {
        let keyPair = CosmosKeypair.import(privateKey);
        if (keyPair) {
            return encode({
                address: keyPair.address,
                phrase: null,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey
            });
        }
    }

    isValidAddress(address) {
        return CosmosKeypair.isValidAddress(address);
    }

    isValidPrivate(privateKey) {
        return CosmosKeypair.isValidPrivate(privateKey);
    }

    getAddress(publicKey) {
        if (Codec.Bech32.isBech32(Config.cosmos.bech32.accPub, publicKey)) {
            publicKey = Codec.Bech32.fromBech32(publicKey);
        }
        let pubKey = Codec.Hex.hexToBytes(publicKey);
        let address = CosmosKeypair.getAddress(pubKey);
        address = Codec.Bech32.toBech32(Config.cosmos.bech32.accAddr, address);
        return address;
    }

    encodePublicKey(publicKey){
        let pubkey = publicKey;
        if (Codec.Bech32.isBech32(Config.cosmos.bech32.accPub, pubkey)) {
            pubkey = Codec.Bech32.toBech32(Config.cosmos.bech32.accPub, Codec.Bech32.fromBech32(pubkey));
        }else if (Codec.Hex.isHex(pubkey)){
            pubkey = Codec.Bech32.toBech32(Config.cosmos.bech32.accPub, pubkey);
        }
        return pubkey;
    }
}

function encode(acc){
    if(!Utils.isEmpty(acc)){
        switch (Config.cosmos.defaultCoding){
            case Config.cosmos.coding.bech32:{
                if (Codec.Hex.isHex(acc.address)){
                    acc.address =  Codec.Bech32.toBech32(Config.cosmos.bech32.accAddr, acc.address);
                }
                if (Codec.Hex.isHex(acc.publicKey)){
                    acc.publicKey = Codec.Bech32.toBech32(Config.cosmos.bech32.accPub, acc.publicKey);
                }
            }
        }
        return acc
    }
}

function switchToWordList(language){
    switch (language) {
        case Config.language.cn:
            return Bip39.wordlists.chinese_simplified;
        case Config.language.en:
            return Bip39.wordlists.english;
        case Config.language.jp:
            return Bip39.wordlists.japanese;
        case Config.language.sp:
            return Bip39.wordlists.spanish;
        default:
            return Bip39.wordlists.english;
    }
}

module.exports = Old(CosmosCrypto);