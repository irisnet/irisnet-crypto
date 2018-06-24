const Hex = require("../../hex");
const bech32 = require('bech32');
const base64 = require('base64-node');
const privKey = require('../privKey');

// don't need to deal with
let MarshalJSON = function (msg) {
    return msg
}

let Acc = class Acc{
    constructor(address,coins,public_key,private_key,chain_id,account_number,sequence){
        this.address = address;
        this.coins = coins;
        this.public_key = public_key;
        this.private_key = private_key;
        this.chain_id = chain_id;
        this.account_number = account_number;
        this.sequence = sequence;
    }
}

let Coin = class Coin{
    constructor(amount,denom){
        this.denom = denom;
        this.amount = amount;
    }
}

let Input =  class Input{
    constructor(address,coins){
        this.address = address;
        this.coins = coins;
    }
}

Input.prototype.GetSignBytes = function () {
    let addrByte = bech32.toWords(Buffer.from(this.address, 'hex'))
    let bech32Acc = bech32.encode("cosmosaccaddr",addrByte)
    let msg = {
        "address":bech32Acc,
        "coins":this.coins
    }
    return MarshalJSON(msg)
}

let Output =  class Output{
    constructor(address,coins){
        this.address = address;
        this.coins = coins;
    }
}
Output.prototype.GetSignBytes = function () {
    let addrByte = bech32.toWords(Buffer.from(this.address, 'hex'))
    let bech32Acc = bech32.encode("cosmosaccaddr",addrByte)
    let msg = {
        "address":bech32Acc,
        "coins":this.coins
    }
    return MarshalJSON(msg)
}

let MsgSend = class MsgSend{
    constructor(from,to,coins){
        this.inputs = [new Input(from,coins)];
        this.outputs = [new Output(to,coins)];
    }
}

MsgSend.prototype.GetSignBytes = function () {
    let inputs = []
    let outputs = []
    this.inputs.forEach(function (item,index,arr) {
        inputs.push(item.GetSignBytes())
    })
    this.outputs.forEach(function (item,index,arr) {
        outputs.push(item.GetSignBytes())
    })
    let msg = {
        "inputs":inputs,
        "outputs":outputs
    }
    return base64.encode(JSON.stringify((msg)))

}

let StdFee = class StdFee{
    constructor(amount,gas){
        this.amount = amount;
        this.gas = gas;
    }
}

StdFee.prototype.Bytes = function () {
    if (!this.amount || this.amount.length == 0 ){
        this.amount = [new Coin(0, "iris")]
    }
    return base64.encode((JSON.stringify((this))))
}

let StdSignMsg = class StdSignMsg{
    constructor(chainID,accnum,sequence,fee,msg){
        this.chainID = chainID;
        this.accnum = [accnum];
        this.sequence = [sequence];
        this.fee = fee;
        this.msg = msg
    }
}

StdSignMsg.prototype.Bytes = function(){
    var tx = {
        "chain_id" : this.chainID,
        "account_numbers" : this.accnum,
        "sequences" : this.sequence,
        "fee_bytes" : this.fee.Bytes(),
        "msg_bytes" : this.msg.GetSignBytes(),
        "alt_bytes" : null
    }
    return MarshalJSON(tx)
}

let StdSignature = class StdSignature{
    constructor(pub_key,signature,account_number,sequence){
        this.pub_key = pub_key;
        this.signature = signature;
        this.account_number = account_number;
        this.sequence = sequence
    }
}

let StdTx = class StdTx{
    constructor(msg,fee,signatures){
        this.msg = msg;
        this.fee = fee;
        this.signatures = signatures
    }
}

let BuildTx = function(acc,toAddress,coins,fee,gas){
    var stdFee = new StdFee(fee,gas)
    var msg = new MsgSend(acc.address,toAddress,coins);
    var signMsg = new StdSignMsg(acc.chain_id,acc.account_number,acc.sequence,stdFee,msg)
    var signbyte = privKey.Sign(acc.private_key,signMsg.Bytes())
    var signs = [new StdSignature(Hex.hexToBytes(acc.public_key),signbyte,acc.account_number,acc.sequence)]
    var stdTx = new StdTx(signMsg.msg,signMsg.fee,signs)
    return stdTx
}

module.exports = {
    BuildTx:BuildTx,
    Coin:Coin,
    Input:Input,
    Output:Output,
    MsgSend:MsgSend,
    StdFee:StdFee,
    StdSignMsg:StdSignMsg,
    StdSignature:StdSignature,
    StdTx:StdTx,
};