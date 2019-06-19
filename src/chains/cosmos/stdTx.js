const Utils = require('../../util/utils');
const Codec = require('../../util/codec');
const Config = require('../../../config');
const Builder = require("../../builder");
const Amino = require("../base");
const TxSerializer = require("./tx/tx_serializer");
const Base64 = require('base64-node');
const Root = require('./tx/tx');
const StdFee = Root.cosmos.StdFee;
const Coin = Root.cosmos.Coin;

StdFee.prototype.GetSignBytes = function (){
    if (Utils.isEmpty(this.amount)) {
        this.amount = [new Coin({denom:'',amount:'0'})]
    }
    return {
        amount: this.amount,
        gas: this.gas
    }
};

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
            account_number: this.account_number,
            chain_id: this.chain_id,
            fee: this.fee.GetSignBytes(),
            memo: this.memo,
            msgs: msgs,
            sequence: this.sequence
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

class StdTx {
    constructor(properties) {
        this.msgs = properties.msgs;
        this.fee = properties.fee;
        this.signatures = null;
        this.memo = properties.memo;
        this.signMsg = properties;
    }

    SetSignature(sig){
        if (typeof sig === "string") {
            sig = JSON.parse(sig);
        }
        let signature = new Root.cosmos.StdSignature({
            pubKey:sig.pub_key,
            signature:sig.signature,
        });
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
        this.signatures[0].pubKey = pubkey

    }

    GetData() {
        let signatures = [];
        if (this.signatures){
            this.signatures.forEach(function(sig) {
                let publicKey = "";
                let signature = "";
                if (sig.pubKey.length > 33) {
                    //去掉amino编码前缀
                    publicKey = sig.pubKey.slice(5, sig.pubKey.length)
                }
                publicKey = Base64.encode(publicKey);

                if (!Utils.isEmpty(sig.signature)) {
                    signature = Base64.encode(sig.signature);
                }

                signatures.push({
                    pub_key: Amino.MarshalJSON(Config.cosmos.amino.pubKey, publicKey),
                    signature: signature,
                })
            });
        }

        let msgs = [];
        this.msgs.forEach(function(msg) {
            msgs.push(msg.GetSignBytes())
        });
        let fee = {
            amount: this.fee.amount,
            gas: Utils.toString(this.fee.gas)
        };
        return {
            'tx': {
                msg: msgs,
                fee: fee,
                signatures: signatures,
                memo: this.memo
            },
            'mode': 'sync'
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
            data: this.GetData(),
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
    static create(req,msg) {
        let fee = new StdFee({
            amount:req.fees,
            gas:req.gas
        })
        let stdMsg = new StdSignMsg(req.chain_id, req.account_number, req.sequence, fee, msg, req.memo, req.type);
        stdMsg.ValidateBasic();
        return new StdTx(stdMsg)
    }
};