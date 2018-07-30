'use strict';

const Bech32 = require('../../util/bech32');
const Constants = require('./constants');
const Base64 = require('base64-node');
const Builder = require("../../builder");

// don't need to deal with
let MarshalJSON = function (msg) {
    return msg
};

class Coin{
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
        let bech32Acc = Bech32.toBech32(Constants.IrisNetConfig.PREFIX_BECH32_ACCADDR, this.address)
        let msg = {
            "address": bech32Acc,
            "coins": this.coins
        };
        return MarshalJSON(msg)
    }

    ValidateBasic() {
        if(!this.address || this.address.length ==0){
            throw new Error("address is empty");
        }

        if(!this.coins || this.coins.size == 0){
            throw new Error("coins is empty");
        }
    }
}

class Output extends Builder.Validator{
    constructor(address, coins) {
        super();
        this.address = address;
        this.coins = coins;
    }

    GetSignBytes() {
        let bech32Acc = Bech32.toBech32(Constants.IrisNetConfig.PREFIX_BECH32_ACCADDR, this.address);
        let msg = {
            "address": bech32Acc,
            "coins": this.coins
        };
        return MarshalJSON(msg)
    }

    ValidateBasic() {
        if(!this.address || this.address.length ==0){
            throw new Error("address is empty");
        }

        if(!this.coins || this.coins.size == 0){
            throw new Error("coins is empty");
        }
    }
}

class MsgSend extends Builder.Validator{
    constructor(from, to, coins) {
        super();
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
        return Base64.encode(JSON.stringify((msg)))
    }

    ValidateBasic() {
        if(this.inputs.size <= 0) {
            throw new Error("sender is  empty");
        }
        if(this.outputs.size <= 0) {
            throw new Error("sender is  empty");
        }

        this.inputs.forEach(function (input) {
           input.ValidateBasic();
        });

        this.outputs.forEach(function (output) {
            output.ValidateBasic();
        })

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
        if (!this.amount || this.amount.length == 0) {
            this.amount = [new Coin(0, "")]
        }
        return Base64.encode((JSON.stringify((this))))
    }
}


class StdSignMsg extends Builder.SignMsg {
    constructor(chainID, accnum, sequence, fee, msg) {
        super();
        this.chainID = chainID;
        this.accnum = [accnum];
        this.sequence = [sequence];
        this.fee = fee;
        this.msg = msg;
        this.signByte = this.GetSignBytes();
    }

    GetSignBytes() {
        let tx = {
            "chain_id": this.chainID,
            "account_numbers": this.accnum,
            "sequences": this.sequence,
            "fee_bytes": this.fee.GetSignBytes(),
            "msg_bytes": this.msg.GetSignBytes(),
            "alt_bytes": null
        };
        return MarshalJSON(tx)
    }

    ValidateBasic() {
        if (!this.chainID || this.chainID.length == 0){
            throw new Error("chainID is  empty");
        }
        if (!this.accnum || this.chainID.size == 0){
            throw new Error("accountNumber is  empty");
        }
        if (!this.sequence || this.sequence.size == 0){
            throw new Error("accountNumber is  empty");
        }
        this.msg.ValidateBasic();
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
    constructor(msg, fee, signatures, type) {
        this.msg = JSON.stringify(msg);//TODO
        this.fee = fee;
        this.signatures = signatures;
        this.type = type
    }
}


let getTransferSignMsg = function (acc, toAddress, coins, fee, gas) {
    let stdFee = new StdFee(fee, gas);
    let msg = new MsgSend(acc.address, toAddress, coins);
    let signMsg = new StdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg);
    return signMsg
};

module.exports = {
    getTransferSignMsg,
    Coin,
    Input,
    Output,
    MsgSend,
    StdFee,
    StdSignMsg,
    StdSignature,
    StdTx,
};