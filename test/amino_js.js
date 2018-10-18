const ProtoBuf = require("protobufjs");
const Codec = require("../util/codec");
const Sha256 = require("sha256");

let root = ProtoBuf.loadSync('/Users/zhangzhiqiang/develop/GitHub/irisnet-crypto/test/tx.proto');

let Coin = root.lookupType("irisnet.tx.Coin");
let Input = root.lookupType("irisnet.tx.Input");
let Output = root.lookupType("irisnet.tx.Output");
let MsgSend = root.lookupType("irisnet.tx.MsgSend");
let StdFee = root.lookupType("irisnet.tx.StdFee");
let StdSignature = root.lookupType("irisnet.tx.StdSignature");
let StdTx = root.lookupType("irisnet.tx.StdTx");

module.exports = Coin;
module.exports = Input;
module.exports = Output;
module.exports = MsgSend;
module.exports = StdSignature;
module.exports = StdTx;


class Amino {
    constructor() {
        this._keyMap = {};
    }

    RegisterConcrete(type,name) {
        this._keyMap[type.fullName] = this._aminoPrefix(name)
    }

    isRegister(type){
        let v = this._keyMap[type.fullName];
        return !(v === "" || v === undefined)
    }

    MarshalBinary(object) {
        let buf = Buffer.from([19,1]);
        return Buffer.concat([buf,this.MarshalBinaryBare(object)])
    }

    MarshalBinaryBare(object) {
        let fields = object.$type.fields;
        let buf = Buffer.from([]);

        Object.keys(fields).forEach(function (field) {
            console.log("field",field);
            let fieldType = fields[field].resolvedType;
            if(amino.isRegister(fieldType)) {
                let b = fieldType.encode(object[field]).finish();
                let pre = Buffer.from(amino._keyMap[fieldType.fullName]);
                buf = Buffer.concat([buf,pre,b])
            }else {
                let buffer = fieldType.encode(object[field]).finish();
                buf = Buffer.concat([buf,buffer])
            }
        });
        return buf
    }

    _aminoPrefix(name) {
        let a = Sha256(name);
        let b = Codec.Hex.hexToBytes(a);
        while (b[0] === 0) {
            b = b.slice(1, b.length - 1)
        }
        b = b.slice(3, b.length - 1);
        while (b[0] === 0) {
            b = b.slice(1, b.length - 1)
        }
        b = b.slice(0, 4);//注意和go-amino v0.6.2以前的不一样
        return b
    }
}

let amino = new Amino();
amino.RegisterConcrete(MsgSend,"cosmos-sdk/Send");
amino.RegisterConcrete(StdTx,"auth/StdTx");

module.exports = {amino,Coin,Input,Output,MsgSend,StdFee,StdSignature,StdTx};