'use strict';

const Utils = require('../../util/utils');
const Constants = require('./constants');
const Builder = require("../../builder");
const Amino = require("./amino");
const TxSerializer = require("./tx/tx_serializer");
const Base64 = require('base64-node');

class Coin extends Builder.Creator{
    constructor(amount, denom) {
        super();
        this.denom = denom;
        this.amount = amount;
    }
    Create(properties){
        return new Coin(properties.denom,properties.amount)
    }
}

class Input extends Builder.Validator {
    constructor(address, coins) {
        super();
        this.address = address;
        this.coins = coins;
    }

    GetSignBytes() {
        let msg = {
            "address": this.address,
            "coins": this.coins
        };
        return Utils.sortObjectKeys(msg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.address)) {
            throw new Error("address is empty");
        }

        if (Utils.isEmpty(this.coins)) {
            throw new Error("coins is empty");
        }
    }

    Create(properties){
        return new Input(properties.address,properties.coins)
    }
}

class Output extends Builder.Validator {
    constructor(address, coins) {
        super();
        this.address = address;
        this.coins = coins;
    }

    GetSignBytes() {
        let msg = {
            "address": this.address,
            "coins": this.coins
        };
        return Utils.sortObjectKeys(msg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.address)) {
            throw new Error("address is empty");
        }

        if (Utils.isEmpty(this.coins)) {
            throw new Error("coins is empty");
        }
    }

    Create(properties){
        return new Output(properties.address,properties.coins)
    }
}

class MsgSend extends Builder.Msg {
    constructor(from, to, coins) {
        super("cosmos-sdk/Send");
        this.inputs = [new Input(from, coins)];
        this.outputs = [new Output(to, coins)];
    }

    GetSignBytes() {
        let inputs = [];
        let outputs = [];
        this.inputs.forEach(function (item) {
            inputs.push(item.GetSignBytes())
        });
        this.outputs.forEach(function (item) {
            outputs.push(item.GetSignBytes())
        });
        let msg = {
            "inputs": inputs,
            "outputs": outputs
        };

        return Utils.sortObjectKeys(msg);
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.inputs)) {
            throw new Error("sender is  empty");
        }
        if (Utils.isEmpty(this.outputs)) {
            throw new Error("sender is  empty");
        }

        this.inputs.forEach(function (input) {
            input.ValidateBasic();
        });

        this.outputs.forEach(function (output) {
            output.ValidateBasic();
        })

    }

    Type(){
        return "cosmos-sdk/Send";
    }

    GetMsg(){
        let inputs = [];
        let outputs = [];

        this.inputs.forEach(function (item) {
            const BECH32 = require('bech32');
            let ownKey = BECH32.decode(item.address);
            let addrHex = BECH32.fromWords(ownKey.words);
            inputs.push({address:addrHex,coins:item.coins})
        });

        this.outputs.forEach(function (item) {
            const BECH32 = require('bech32');
            let ownKey = BECH32.decode(item.address);
            let addrHex = BECH32.fromWords(ownKey.words);
            outputs.push({address:addrHex,coins:item.coins})
        });
        return {
            input : inputs,
            output : outputs
        }
    }
}

class StdFee {
    constructor(amount, gas) {
        this.amount = amount;
        if (!gas) {
            gas = Constants.IrisNetConfig.MAXGAS;
        }
        this.gas = gas;
    }

    GetSignBytes() {
        if (Utils.isEmpty(this.amount)) {
            this.amount = [new Coin("0", "")]
        }
        return {
            amount:this.amount,
            gas:this.gas
        }
    }
}


class StdSignMsg extends Builder.Msg {
    constructor(chainID, accnum, sequence, fee, msg, memo) {
        super();
        this.chainID = chainID;
        this.accnum = accnum;
        this.sequence = sequence;
        this.fee = fee;
        this.msgs = [msg];
        this.memo = memo;
        //this.signByte = this.GetSignBytes();
    }

    GetSignBytes() {
        let msgs = [];
        this.msgs.forEach(function (msg) {
            msgs.push(msg.GetSignBytes())
        });

        let tx = {
            "account_number": this.accnum,
            "chain_id": this.chainID,
            "fee": this.fee.GetSignBytes(),//TODO
            "memo": this.memo,
            "msgs": msgs,
            "sequence": this.sequence
        };
        return Utils.sortObjectKeys(tx)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.chainID)) {
            throw new Error("chainID is  empty");
        }
        if (this.accnum < 0) {
            throw new Error("accountNumber is  empty");
        }
        if (this.sequence < 0) {
            throw new Error("sequence is  empty");
        }
        this.msgs.forEach(function (msg) {
            msg.ValidateBasic();
        });
    }
}

class StdSignature {
    constructor(pub_key, signature, account_number, sequence) {
        this.pub_key = pub_key;
        this.signature = signature;
        this.account_number = account_number;
        this.sequence = sequence;
    }
}

class StdTx {
    constructor(msgs, fee, signatures, memo) {
        this.msgs = msgs;
        this.fee = fee;
        this.signatures = signatures;
        this.memo = memo
    }

    /**
     * @Deprecated
     *
     * @returns {{msgs: Array, fee: *, signatures: *, memo: *}}
     * @constructor
     */
    GetPostData(){
        let fmtMsgs = function (msgs) {
            let msgS = [];
            msgs.forEach(function (msg) {
                msgS.push(JSON.stringify(Amino.MarshalJSON(msg.type,msg)))
            });
            return msgS
        };
        return {
            msgs:fmtMsgs(this.msgs),
            fee:this.fee,
            signatures:this.signatures,
            memo:this.memo,
        }
    }

    /**
     *  用于计算交易hash和签名后的交易内容(base64编码)
     *
     *  可以直接将data提交到irishub的/txs接口
     *
     * @returns {{data: *, hash: *}}
     * @constructor
     */
    Hash(){
        let result = TxSerializer.encode(this);
        return {
            data : Base64.encode(result.data),
            hash : result.hash
        }
    }

}

module.exports = class Bank{
    static CreateMsgSend(req) {
        let coins = [];
        if (!Utils.isEmpty(req.msg.coins)){
            req.msg.coins.forEach(function (item) {
                coins.push({
                    denom:item.denom,
                    amount:Utils.toString(item.amount),
                });
            });
        }
        let msg = new MsgSend(req.from, req.msg.to, coins);
        return msg
    }

    static NewStdSignature(pub_key, signature, account_number, sequence){
        return new StdSignature(pub_key, signature, account_number, sequence)
    }

    static NewStdTx(msgs, fee, signatures, memo){
        return new StdTx(msgs, fee, signatures, memo)
    }

    static NewMsgSend(from, to, coins){
        return new MsgSend(from, to, coins)
    }

    static NewStdFee(amount, gas){
        return new StdFee(amount, gas)
    }

    static NewStdSignMsg(chainID, accnum, sequence, fee, msg, memo){
        return new StdSignMsg(chainID, accnum, sequence, fee, msg, memo)
    }

    static NewCoin(amount, denom){
        return new Coin(amount, denom)
    }

    static Create(properties){
        return new MsgSend(properties.inputs[0].address,properties.outputs[0].address,properties.outputs[0].coins)
    }
};
