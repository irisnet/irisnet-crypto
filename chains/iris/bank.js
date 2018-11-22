'use strict';

const Utils = require('../../util/utils');
const Constants = require('./constants');
const Builder = require("../../builder");
const Amino = require("./amino");
const TxSerializer = require("./tx/tx_serializer");

class Coin {
    constructor(amount, denom) {
        this.denom = denom;
        this.amount = amount;
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
        this.signByte = this.GetSignBytes();
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

    Hash(){
        let result = TxSerializer.encode(this);
        return {
            data : result.data,
            hash : result.hash
        }
    }

}

module.exports = class Bank{
    static GetTransferSignMsg(acc, toAddress, coins, fee, gas, memo) {
        let stdFee = new StdFee(fee, gas);
        let msg = new MsgSend(acc.address, toAddress, coins);
        let signMsg = new StdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg, memo);
        return signMsg
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
};