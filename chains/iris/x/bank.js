'use strict';

const bech32 = require('../../../common/bech32');
const base64 = require('base64-node');

const SignMsg = require("../../sign_msg");

// don't need to deal with
let MarshalJSON = function (msg) {
    return msg
};

class Coin {
    constructor(amount, denom) {
        this.denom = denom;
        this.amount = amount;
    }
}

class Input {
    constructor(address, coins) {
        this.address = address;
        this.coins = coins;
    }

    GetSignBytes(){
        let bech32Acc = bech32.toBech32("cosmosaccaddr", this.address)
        let msg = {
            "address": bech32Acc,
            "coins": this.coins
        };
        return MarshalJSON(msg)
    }
}

class Output {
    constructor(address, coins) {
        this.address = address;
        this.coins = coins;
    }

    GetSignBytes(){
        let bech32Acc = bech32.toBech32("cosmosaccaddr", this.address);
        let msg = {
            "address": bech32Acc,
            "coins": this.coins
        };
        return MarshalJSON(msg)
    }
}

class MsgSend {
    constructor(from, to, coins) {
        this.inputs = [new Input(from, coins)];
        this.outputs = [new Output(to, coins)];
    }

    GetSignBytes(){
        let inputs = [];
        let outputs = [];
        this.inputs.forEach(function (item, index, arr) {
            inputs.push(item.GetSignBytes())
        });
        this.outputs.forEach(function (item, index, arr) {
            outputs.push(item.GetSignBytes())
        });
        let msg = {
            "inputs": inputs,
            "outputs": outputs
        };
        return base64.encode(JSON.stringify((msg)))
    }
}


class StdFee {
    constructor(amount, gas) {
        this.amount = amount;
        if (!gas) {
            gas = 20000
        }
        this.gas = gas;
    }

    GetSignBytes(){
        if (!this.amount || this.amount.length == 0) {
            this.amount = [new Coin(0, "iris")]
        }
        return base64.encode((JSON.stringify((this))))
    }
}


class StdSignMsg extends SignMsg{
    constructor(chainID, accnum, sequence, fee, msg) {
        super();
        this.chainID = chainID;
        this.accnum = [accnum];
        this.sequence = [sequence];
        this.fee = fee;
        this.msg = msg
    }

    GetSignBytes(){
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