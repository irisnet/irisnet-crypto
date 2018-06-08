'use strict'
const Encoding = require("text-encoding");
const PubKey = require("../pubKey");
const Hex = require("../../hex");

const ALGO = "ed25519";
let Actor = class Actor{
    constructor(chain,app,addr){
        this.chain = chain;
        this.app = app;
        this.addr = addr;
    }
}

let Coin = class Coin{
    constructor(amount,denom){
        this.amount = amount;
        this.denom = denom;
    }
}

let SendTnput = class SendTnput{
    constructor(from,to,amount,sequence,fees){
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.sequence = sequence;
        this.fees = fees;
    }
}
let Sig = class Sig{
    constructor(type,data){
        this.type = type;
        this.data = data;
    }
}
let Pubkey = class Pubkey{
    constructor(type,data){
        this.type = type;
        this.data = data;
    }
}
let Signature = class Signature{
    constructor(Sig,Pubkey){
        this.Sig = Sig;
        this.Pubkey = Pubkey;
    }
}

let Account = class Account{
    constructor(name,password,addr,pubkey,priKey,seed_phrase){
        //用户名
        this.name = name;
        //用户密码
        this.password = password;
        //用户钱包地址
        this.addr = addr;
        //用户钱包公钥
        this.pubkey = pubkey;
        //用户钱包私钥
        this.priKey = priKey;
        //用户助记词
        this.seed_phrase = seed_phrase;
    }

    //本地签名方法
    //TODO
    sign(mess){
        var Nacl = require("tweetnacl");
        var PrivateKey = require("../privKey")

        var b;

        if(this.priKey){
            b = Nacl.sign.keyPair.fromSecretKey(this.priKey);
        }else if(this.seed_phrase){
            var Wordcodec = require("../../wordcodec");
            let words = this.seed_phrase.split(" ");
            var secret = Wordcodec.WordsToBytes(words);
            secret = secret.slice(0, secret.length - 1);

            secret = PrivateKey.GenSeedEd25519FromSecret(secret);

            b = Nacl.sign.keyPair.fromSeed(new Uint8Array(secret));
        }else {
            throw "priv_key or seed_phrase is required ";
        }

        // var addr = PubKey.Address_Ed25519(b.publicKey);
        // addr = addr.toUpperCase();


        let signTx = Nacl.sign.detached(new Encoding.TextEncoder("utf-8").encode(mess), b.secretKey);

        let short_sign = Hex.bytesToHex(signTx);

        let sig = new Sig(ALGO, short_sign);

        let pub_key = Hex.bytesToHex(b.publicKey).toUpperCase();

        let pubKey = new Pubkey(ALGO, pub_key);
        return new Signature(sig, pubKey);
    }
}

let Config =  class Config{
    constructor(account,gaia_addr,ten_addr){
        this.account = account;
        this.gaia_addr = gaia_addr;
        this.ten_addr = ten_addr;
    }
}

module.exports = {
    Account:Account,
    Actor:Actor,
    Coin:Coin,
    SendTnput:SendTnput,
    Sig:Sig,
    Pubkey:Pubkey,
    Signature:Signature,
    Config:Config
};