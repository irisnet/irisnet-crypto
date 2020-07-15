'use strict';

const Codec = require("../../util/codec");
const Util = require("../../util/utils");
const Sha256 = require("sha256");
const RIPEMD160 = require('ripemd160');
const Bip39 = require('bip39');
const Random = require('randombytes');
const Secp256k1 = require('secp256k1');
const BN = require("bn");
const Config = require('../../../config');
const Amino = require('../base');

class CosmosKeypair {

    static getPrivateKeyFromSecret(mnemonicS, path) {
        let seed = Bip39.mnemonicToSeed(mnemonicS);
        let master = Hd.ComputeMastersFromSeed(seed);
        let derivedPriv = Hd.DerivePrivateKeyForPath(master.secret,master.chainCode, path);
        return derivedPriv;
    }

    static sign(private_key, msg) {
        //将签名字符串使用Sha256构造32位byte数组
        let sigByte = Buffer.from(JSON.stringify(msg));
        let sig32 = Buffer.from(Sha256(sigByte,{ asBytes: true }));

        //对数据签名
        let prikeyArr = Buffer.from(new Uint8Array(Codec.Hex.hexToBytes(private_key)));
        let sig = Secp256k1.sign(sig32,prikeyArr);
        //let signature = Buffer.from(Hd.Serialize(sig.signature));
        return Array.from(sig.signature)
    }

    static getAddress(publicKey) {
        if (publicKey.length > 33){
            //去掉amino编码前缀
            publicKey = publicKey.slice(5,publicKey.length)
        }
        let hmac = Sha256(publicKey);
        let b = Buffer.from(Codec.Hex.hexToBytes(hmac));
        let addr = new RIPEMD160().update(b);
        return addr.digest('hex').toUpperCase();
    }

    static create(language, mnemonicLength){
        let mnemonicS = this.generateMnemonic(language, mnemonicLength);

        //生成私钥
        let secretKey = this.getPrivateKeyFromSecret(mnemonicS, Config.cosmos.bip39Path);
        //构造公钥
        let pubKey = Secp256k1.publicKeyCreate(secretKey);
        pubKey = Amino.MarshalBinary(Config.cosmos.amino.pubKey,pubKey);

        return {
            "secret": mnemonicS,
            "address": this.getAddress(pubKey),
            "privateKey": Codec.Hex.bytesToHex(secretKey),
            "publicKey": Codec.Hex.bytesToHex(pubKey),
        };
    }

    static generateMnemonic(language, mnemonicLength) {
        //默认生成24位助记词
        let entropySize = 24 * 11 - 8;
        switch(mnemonicLength){
            case 12:
            entropySize = 12 * 11 - 4;
            break;
            case 15:
            entropySize = 15 * 11 - 5;
            break;
            case 18:
            entropySize = 18 * 11 - 6;
            break;
            case 21:
            entropySize = 21 * 11 - 7;
            break;
        }
        let entropy = Random(entropySize / 8);
        let mnemonicS = Bip39.entropyToMnemonic(entropy,language);
        while (Util.hasRepeatElement(mnemonicS," ")){
            entropy = Random(entropySize / 8);
            mnemonicS = Bip39.entropyToMnemonic(entropy,language);
        }
        return mnemonicS;
    }

    static recover(mnemonic,language, path){
        this.checkSeed(mnemonic,language);
        //生成私钥
        let secretKey = this.getPrivateKeyFromSecret(mnemonic, path);
        //构造公钥
        let pubKey = Secp256k1.publicKeyCreate(secretKey);
        pubKey = Amino.MarshalBinary(Config.cosmos.amino.pubKey,pubKey);
        return {
            "secret": mnemonic,
            "address": this.getAddress(pubKey),
            "privateKey": Codec.Hex.bytesToHex(secretKey),
            "publicKey": Codec.Hex.bytesToHex(pubKey)
        };
    }

    static checkSeed(mnemonic,language){
        const seed = mnemonic.split(" ");
        if(seed.length != 12 && seed.length != 15 && seed.length != 18 && seed.length != 21 && seed.length != 24){
            throw new Error("seed length must be equal 12、15、18、21、24");
        }
        if (!Bip39.validateMnemonic(mnemonic,language)){
            throw new Error("seed is invalid");
        }
    }

    static import(secretKey){
        let secretBytes = Buffer.from(secretKey,"hex");
        //构造公钥
        let pubKey = Secp256k1.publicKeyCreate(secretBytes);
        pubKey = Amino.MarshalBinary(Config.cosmos.amino.pubKey,pubKey);
        return {
            "address": this.getAddress(pubKey),
            "privateKey": secretKey,
            "publicKey": Codec.Hex.bytesToHex(pubKey)
        };
    }

    static isValidAddress(address) {
        let prefix = Config.cosmos.bech32.accAddr;
		return Codec.Bech32.isBech32(prefix,address);
    }

    static isValidPrivate(privateKey) {
        return /^[0-9a-fA-F]{64}$/i.test(privateKey);
    }
}

class Hd {

    static ComputeMastersFromSeed(seed) {
        let masterSecret = Buffer.from("Bitcoin seed");
        let master = Hd.I64(masterSecret,seed);
        return master
    }

    static DerivePrivateKeyForPath(privKeyBytes, chainCode, path) {
        if (path === 'm' || path === 'M' || path === "m'" || path === "M'") {
            return privKeyBytes;
        }

        let data = privKeyBytes;
        let parts = path.split("/");
        parts.forEach(function (part, index) {
            if (index === 0) {
                if(!(/^[mM]{1}/.test(part))){
                    throw new Error('Path must start with "m" or "M"');
                }
                return;
            }

            let harden = part.slice(part.length-1,part.length) === "'";
            if (harden) {
                part = part.slice(0,part.length -1);
            }
            let idx = parseInt(part);
            let json = Hd.DerivePrivateKey(data, chainCode, idx, harden);
            data = json.data;
            chainCode = json.chainCode;
        });
        let derivedKey = data;
        return derivedKey
    }

    static I64(key , data) {
        let createHmac = require('create-hmac');
        let hmac = createHmac('sha512', key);
        hmac.update(data); //optional encoding parameter
        let i = hmac.digest(); // synchronously get result with optional encoding parameter
        return {
            secret : i.slice(0,32),
            chainCode : i.slice(32,i.length)
        }
    }

    static DerivePrivateKey(privKeyBytes, chainCode, index, harden) {
        let data;
        // let indexBuffer = Buffer.from([index]);
        let indexBuffer = Buffer.allocUnsafe(4);
        indexBuffer.writeUInt32BE(index, 0);
        if(harden){
            let c = new BN(index).or(new BN(0x80000000));
			indexBuffer = c.toBuffer();

            let privKeyBuffer = Buffer.from(privKeyBytes);
            data = Buffer.from([0]);
            data = Buffer.concat([data,privKeyBuffer]);
        }else{
            const pubKey =Secp256k1.publicKeyCreate(privKeyBytes);
            // if (index ==0){
            //     indexBuffer = Buffer.from([0,0,0,0]);
            // }
            data = pubKey
        }
        data = Buffer.concat([data,indexBuffer]);
        let i64P = Hd.I64(chainCode, Uint8Array.from(data));
        let aInt = new BN(privKeyBytes);
        let bInt = new BN(i64P.secret);
        let x = Hd.AddScalars(aInt, bInt);

        return {
            data : x,
            chainCode : i64P.chainCode
        }
    }

    static AddScalars(a, b) {
        let c = a.add(b);
        const bn = require('secp256k1/lib/js/bn');
        let n = bn.n.toBuffer();
        let x = c.mod(new BN(n)).toBuffer();
        let buf = Buffer.alloc(32);
        buf.fill(x,32 - x.length);
        return buf
    }
    static Serialize(sig) {
        const sigObj = {r: sig.slice(0, 32), s: sig.slice(32, 64)};
        const SignatureFun = require('elliptic/lib/elliptic/ec/signature');
        let signature = new SignatureFun(sigObj);

        return signature.toDER();
    }
}


module.exports = CosmosKeypair;