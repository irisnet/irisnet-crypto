'use strict';

const Utils = require('../../util/utils');
const Codec = require('../../util/codec');
const Config = require('../../config');
const Builder = require("../../builder");
const Amino = require("./amino");
const TxSerializer = require("./tx/tx_serializer");
const Base64 = require('base64-node');

class Coin{
    constructor(amount, denom) {
        this.denom = denom;
        this.amount = amount;
    }
}

class MsgSend extends Builder.Msg {
    constructor(from, to, coins) {
        super(Config.cosmos.tx.transfer.prefix);
        this.from_address = from;
        this.to_address = to;
        this.amount = coins;
    }

    GetSignBytes() {
        let msg = {
            "from_address": this.from_address,
            "to_address": this.to_address,
            "amount": this.amount
        };
        let sortMsg = Utils.sortObjectKeys(msg);
        return Amino.MarshalJSON(this.Type(), sortMsg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.from_address)) {
            throw new Error("sender is  empty");
        }
        if (Utils.isEmpty(this.to_address)) {
            throw new Error("sender is  empty");
        }

    }

    Type() {
        return Config.cosmos.tx.transfer.prefix;
    }

    GetMsg() {
        const BECH32 = require('bech32');
        let fromOwnKey = BECH32.decode(this.from_address);
        let from_address = BECH32.fromWords(fromOwnKey.words);

        let toOwnKey = BECH32.decode(this.to_address);
        let to_address = BECH32.fromWords(toOwnKey.words);

        return {
            FromAddress: from_address,
            ToAddress: to_address,
            Amount: this.amount
        }
    }

    GetDisplayContent(){
        return {
            i18n_tx_type:"i18n_transfer",
            i18n_from:this.inputs[0].address,
            i18n_to:this.outputs[0].address,
            i18n_amount:this.outputs[0].coins,
        }
    }
}

class StdFee {
    constructor(amount, gas) {
        this.amount = amount;
        if (!gas) {
            gas = Config.cosmos.maxGas;
        }
        this.gas = gas;
    }

    GetSignBytes() {
        if (Utils.isEmpty(this.amount)) {
            this.amount = [new Coin("0", "")]
        }
        return {
            amount: this.amount,
            gas: this.gas
        }
    }
}

class StdSignMsg extends Builder.Msg {
    constructor(chainID, accnum, sequence, fee, msg, memo, msgType) {
        super(msgType);
        this.chain_id = chainID;
        this.account_number = accnum;
        this.sequence = sequence;
        this.fee = fee;
        this.msgs = [msg];
        this.memo = memo;
    }

    GetSignBytes() {
        let msgs = [];
        this.msgs.forEach(function(msg) {
            msgs.push(msg.GetSignBytes())
        });

        let tx = {
            "account_number": this.account_number,
            "chain_id": this.chain_id,
            "fee": this.fee.GetSignBytes(),
            "memo": this.memo,
            "msgs": msgs,
            "sequence": this.sequence
        };
        return Utils.sortObjectKeys(tx)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.chain_id)) {
            throw new Error("chain_id is  empty");
        }
        if (this.account_number < 0) {
            throw new Error("account_number is  empty");
        }
        if (this.sequence < 0) {
            throw new Error("sequence is  empty");
        }
        this.msgs.forEach(function(msg) {
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
    constructor(properties) {
        this.msgs = properties.msgs;
        this.fee = properties.fee;
        this.signatures = null;
        this.memo = properties.memo;
        this.signMsg = properties
    }

    SetSignature(sig){
        if (typeof sig === "string") {
            sig = JSON.parse(sig);
        }
        let signature = new StdSignature(sig.pub_key,sig.signature,this.signMsg.account_number,this.signMsg.sequence);
        this.signatures = [signature];
    }

    SetPubKey(pubkey){
        if (Codec.Bech32.isBech32(Config.cosmos.bech32.accPub,pubkey)){
            pubkey = Codec.Bech32.fromBech32(pubkey);
        }
        pubkey = Codec.Hex.hexToBytes(pubkey);
        if(!this.signatures || this.signatures.length == 0){
            let signature = {
                pub_key:pubkey
            };
            this.SetSignature(signature);
            return
        }
        this.signatures[0].pub_key = pubkey

    }

    GetData() {
        let signatures = [];
        if (this.signatures){
            this.signatures.forEach(function(sig) {
                let publicKey = "";
                let signature = "";
                if (sig.pub_key.length > 33) {
                    //去掉amino编码前缀
                    publicKey = sig.pub_key.slice(5, sig.pub_key.length)
                }
                publicKey = Base64.encode(publicKey);

                if (!Utils.isEmpty(sig.signature)) {
                    signature = Base64.encode(sig.signature);
                }

                signatures.push({
                    pub_key: Amino.MarshalJSON(Config.cosmos.amino.pubKey, publicKey),
                    signature: signature,
                    account_number: Utils.toString(sig.account_number),
                    sequence: Utils.toString(sig.sequence)
                })
            });
        }

        let msgs = [];
        this.msgs.forEach(function(msg) {
            msgs.push(Amino.MarshalJSON(msg.type, msg))
        });
        let fee = {
            amount: this.fee.amount,
            gas: Utils.toString(this.fee.gas)
        };
        return {
            tx: {
                msg: msgs,
                fee: fee,
                signatures: signatures,
                memo: this.memo
            }
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
    Hash() {
        let result = TxSerializer.encode(this);
        return {
            data: Base64.encode(result.data),
            hash: result.hash
        }
    }

    GetSignBytes(){
        return this.signMsg.GetSignBytes()
    }

    GetDisplayContent(){
        let msg = this.msgs[0];
        let content = msg.GetDisplayContent();
        content.i18n_fee = this.fee.amount;
        return content
    }

}

module.exports = class Bank {
    static CreateMsgSend(req) {
        let coins = [];
        if (!Utils.isEmpty(req.msg.coins)) {
            req.msg.coins.forEach(function(item) {
                coins.push({
                    denom: item.denom,
                    amount: Utils.toString(item.amount),
                });
            });
        }
        let msg = new MsgSend(req.from, req.msg.to, coins);
        return msg
    }

    static NewStdSignature(pub_key, signature, account_number, sequence) {
        return new StdSignature(pub_key, signature, account_number, sequence)
    }

    static NewStdTx(properties) {
        return new StdTx(properties)
    }

    static NewStdFee(amount, gas) {
        return new StdFee(amount, gas)
    }

    static NewStdSignMsg(chainID, accnum, sequence, fee, msg, memo, msgType) {
        return new StdSignMsg(chainID, accnum, sequence, fee, msg, memo, msgType)
    }
};