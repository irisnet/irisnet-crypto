'use strict';

const TypeEd25519 = 1;
const Hex = require("./hex");
const Sha256 = require("sha256");
const Nacl = require("tweetnacl");
const RIPEMD160 = require('ripemd160');

class CosmosKeypair {

    static getPrivateKeyFromSecret(secret) {
        let privKey32 = Sha256(secret);
        privKey32 = Hex.hexToBytes(privKey32);
        return privKey32;
    }

    static sign(private_key, msg) {
        let msgHex = Hex.stringToHex(JSON.stringify(msg))
        let sigByte = Hex.hexToBytes(msgHex)
        let msgArr = new Uint8Array(sigByte)
        let prikeyArr = new Uint8Array(Hex.hexToBytes(private_key))
        let sig = Nacl.sign.detached(msgArr, prikeyArr)
        return Hex.hexToBytes(Hex.bytesToHex(sig))
    }

    static getAddress(publicKey) {
        return new RIPEMD160().update(new Buffer(publicKey)).digest('hex').toUpperCase();
    }

    static create() {
        let ran = Nacl.randomBytes(16);
        let pub;
        let addr;
        let privateKey;
        let publicKey;
        let secretKey = this.getPrivateKeyFromSecret(ran);
        let key = Nacl.sign.keyPair.fromSeed(new Uint8Array(secretKey));
        pub = key.publicKey;
        privateKey = Hex.bytesToHex(key.secretKey);
        addr = this.getAddress(pub);
        publicKey = Hex.bytesToHex(pub);
        let secret = [TypeEd25519];
        secret.push.apply(secret,ran);
        return {
            "secret": secret,
            "address": addr,
            "privateKey": privateKey,
            "publicKey": publicKey
        };
    }

    static recover(secret){
        secret = secret.slice(1, secret.length);

        let pub;
        let addr;
        let privateKey;
        let publicKey;
        let secretKey = this.getPrivateKeyFromSecret(secret);
        let key = Nacl.sign.keyPair.fromSeed(new Uint8Array(secretKey));
        pub = key.publicKey;
        privateKey = Hex.bytesToHex(key.secretKey);
        addr = this.getAddress(pub);
        publicKey = Hex.bytesToHex(pub);
        return {
            "secret": secret,
            "address": addr,
            "privateKey": privateKey,
            "publicKey": publicKey
        };
    }

    static import(secret){
        let pub;
        let addr;
        let privateKey;
        let publicKey;
        let secretBytes = Hex.hexToBytes(secret);
        let key = Nacl.sign.keyPair.fromSecretKey(new Uint8Array(secretBytes));
        pub = key.publicKey;
        privateKey = Hex.bytesToHex(key.secretKey);
        addr = this.getAddress(pub);
        publicKey = Hex.bytesToHex(pub);
        return {
            "address": addr,
            "privateKey": privateKey,
            "publicKey": publicKey
        };
    }

    static isValidAddress(address) {
        return /^[0-9a-fA-F]{40}$/i.test(address);
    }

    static isValidPrivate(privateKey) {
        return /^[0-9a-fA-F]{128}$/i.test(privateKey);
    }
}

module.exports = CosmosKeypair;