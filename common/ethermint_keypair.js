const EthUtil = require('ethereumjs-util');
const EthereumTx = require('ethereumjs-tx');
const Hex = require("./hex");

class EthermintKeypair {
    static Import(secret){
        let publicKey = EthUtil.privateToPublic(secret);
        let addr = EthUtil.publicToAddress(publicKey);
        return {
            "address": "0x" + Hex.bytesToHex(addr),
            "privateKey": Hex.bytesToHex(secret),
            "publicKey": Hex.bytesToHex(publicKey)
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
}

module.exports = EthermintKeypair;