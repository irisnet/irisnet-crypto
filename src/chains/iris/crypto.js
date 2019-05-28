'use strict';
const Crypto = require("../../crypto");
const Old = require('old');
const IrisKeypair = require('./keypair');
const Codec = require("../../util/codec");
const Utils = require("../../util/utils");
const Config = require('../../../config');
const Bip39 = require('bip39');
const Cryp = require("crypto-browserify");

class IrisCrypto extends Crypto {
    
    /**
     *
     * @param language
     * @returns {*}
     */
    create(language) {
        let keyPair = IrisKeypair.create(switchToWordList(language));
        if (keyPair) {
            return encode({
                address: keyPair.address,
                phrase: keyPair.secret,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey
            });
        }
        return keyPair;
    }

    recover(secret, language) {
        let keyPair = IrisKeypair.recover(secret,switchToWordList(language));
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
        let keyPair = IrisKeypair.import(privateKey);
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
        return IrisKeypair.isValidAddress(address);
    }

    isValidPrivate(privateKey) {
        return IrisKeypair.isValidPrivate(privateKey);
    }

    getAddress(publicKey) {
        let pubKey = Codec.Hex.hexToBytes(publicKey);
        let address = IrisKeypair.getAddress(pubKey);
        address = Codec.Bech32.toBech32(Config.iris.bech32.accAddr, address);
        return address;
    }
    exportKeystore(privateKeyHex,password){
        const salt = Cryp.randomBytes(32);
        const iv = Cryp.randomBytes(16);
        const cipherAlg = Config.iris.keystore.cipherAlg;
        const kdf = Config.iris.keystore.kdf;
        const address = this.import(privateKeyHex).address;

        const kdfparams = {
            dklen: 32,
            salt: salt.toString("hex"),
            c: Config.iris.keystore.c,
            prf: "hmac-sha256"
        };
        const derivedKey = Cryp.pbkdf2Sync(Buffer.from(password), salt, kdfparams.c, kdfparams.dklen, "sha256");
        const cipher = Cryp.createCipheriv(cipherAlg, derivedKey.slice(0, 32), iv);
        if (!cipher) {
            throw new Error("Unsupported cipher")
        }

        const cipherBuffer = Buffer.concat([cipher.update(Buffer.from(privateKeyHex, "hex")), cipher.final()]);
        const bufferValue = Buffer.concat([derivedKey.slice(16, 32), cipherBuffer]);
        let hmac = Cryp.createHmac("sha256",bufferValue);
        const mac = hmac.digest().toString("hex");
        return {
            version: 1,
            address: address,
            crypto: {
                ciphertext: cipherBuffer.toString("hex"),
                cipherparams: {
                    iv: iv.toString("hex")
                },
                cipher: cipherAlg,
                kdf,
                kdfparams: kdfparams,
                mac: mac
            }
        }
    }
    importKeystore(keystore, password){
        const kdfparams = keystore.crypto.kdfparams;

        if (kdfparams.prf !== "hmac-sha256") {
            throw new Error("Unsupported parameters to PBKDF2")
        }

        const derivedKey = Cryp.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfparams.salt, "hex"), kdfparams.c, kdfparams.dklen, "sha256");
        const ciphertext = Buffer.from(keystore.crypto.ciphertext, "hex");
        const bufferValue = Buffer.concat([derivedKey.slice(16, 32), ciphertext]);
        let hmac = Cryp.createHmac("sha256",bufferValue);
        const mac = hmac.digest().toString("hex");
        if (mac !==keystore.crypto.mac){
            throw new Error("wrong password")
        }
        const decipher = Cryp.createDecipheriv(keystore.crypto.cipher, derivedKey.slice(0, 32), Buffer.from(keystore.crypto.cipherparams.iv, "hex"));
        const privateKey = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("hex");

        return privateKey.toUpperCase()
    }
}

function encode(acc){
    if(!Utils.isEmpty(acc)){
        switch (Config.iris.defaultCoding){
            case Config.iris.coding.bech32:{
                if (Codec.Hex.isHex(acc.address)){
                    acc.address =  Codec.Bech32.toBech32(Config.iris.bech32.accAddr, acc.address);
                }
                if (Codec.Hex.isHex(acc.publicKey)){
                    acc.publicKey = Codec.Bech32.toBech32(Config.iris.bech32.accPub, acc.publicKey);
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

module.exports = Old(IrisCrypto);