'use strict';

const TypeEd25519 = 1;
const Hex = require("../../util/hex");
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
        let msgHex = Hex.stringToHex(JSON.stringify(msg));
        let sigByte = Hex.hexToBytes(msgHex);
        let msgArr = new Uint8Array(sigByte);
        let prikeyArr = new Uint8Array(Hex.hexToBytes(private_key));
        let sig = Nacl.sign.detached(msgArr, prikeyArr);
        return Hex.hexToBytes(Hex.bytesToHex(sig))
    }

    static getAddress(publicKey) {
        let prefix = nameToPrefix("tendermint/PubKeyEd25519");
        prefix = prefix.concat(publicKey.length);
        let encodeBytes = prefix.concat(Array.from(publicKey));

        let addr = new RIPEMD160().update(new Buffer(encodeBytes));
        return addr.digest('hex').toUpperCase();
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


function nameToPrefix(name) {
    let a = Sha256(name);
    let b = Hex.hexToBytes(a);
    while (b[0] === 0) {
        b = b.slice(1, b.length - 1)
    }
    b = b.slice(3, b.length - 1);
    while (b[0] === 0) {
        b = b.slice(1, b.length - 1)
    }
    b = b.slice(0, 4);
    b[3] = b[3] & 0xF8;
    b[3] = b[3] | 2;
    return b
}

module.exports = CosmosKeypair;