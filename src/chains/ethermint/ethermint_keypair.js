const EthUtil = require('ethereumjs-util');
const EthereumTx = require('ethereumjs-tx');
const Codec = require("../../util/codec");

class EthermintKeypair {
    static Import(secret){
        let publicKey = EthUtil.privateToPublic(secret);
        let addr = EthUtil.publicToAddress(publicKey);
        return {
            "address": "0x" + Codec.Hex.bytesToHex(addr),
            "privateKey": Codec.Hex.bytesToHex(secret),
            "publicKey": Codec.Hex.bytesToHex(publicKey)
        };
    }

    static isValidAddress(address){
        return EthUtil.isValidAddress(address);
    }

    static isValidAddress(privateKey){
        return EthUtil.isValidPrivate(new Buffer(Hex.hexToBytes(privateKey)));
    }

    static sign(rawTx, privateKey){
        let tx = new EthereumTx(rawTx);
        tx.sign(new Buffer(privateKey));
        return tx.sig;
    }

    static getAddress(publicKey){
        let addr = EthUtil.pubToAddress(publicKey)
        return Hex.bytesToHex(addr);
    }
}

module.exports = EthermintKeypair;