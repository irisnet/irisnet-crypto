'use strict';

const Builder = require("../../builder");
const Utils = require('../../util/utils');
const Amino = require('./amino');
const Config = require('../../config');

class MsgDelegate extends Builder.Msg {

    constructor(delegator_addr, validator_addr, delegation) {
        super(Config.iris.tx.delegate.prefix);
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.delegation = delegation;
    }

    GetSignBytes() {

        let msg = {
            "delegator_addr": this.delegator_addr,
            "validator_addr": this.validator_addr,
            "delegation": this.delegation
        };

        let sortMsg = Utils.sortObjectKeys(msg);
        return Amino.MarshalJSON(this.Type(), sortMsg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)) {
            throw new Error("delegator_addr is empty");
        }

        if (Utils.isEmpty(this.validator_addr)) {
            throw new Error("validator_addr is empty");
        }

        if (Utils.isEmpty(this.delegation)) {
            throw new Error("delegation must great than 0");
        }
    }

    Type() {
        return Config.iris.tx.delegate.prefix;
    }

    GetMsg() {
        const BECH32 = require('bech32');
        let delegator_key = BECH32.decode(this.delegator_addr);
        let delegator_addr = BECH32.fromWords(delegator_key.words);

        let validator_key = BECH32.decode(this.validator_addr);
        let validator_addr = BECH32.fromWords(validator_key.words);

        return {
            delegatorAddr: delegator_addr,
            validatorAddr: validator_addr,
            delegation: this.delegation
        }
    }

    static Create(properties){
        return new MsgDelegate(properties.delegator_addr,properties.validator_addr,properties.delegation)
    }

}

class MsgBeginUnbonding extends Builder.Msg {
    constructor(delegator_addr, validator_addr, shares_amount) {
        super(Config.iris.tx.unbond.prefix);
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.shares_amount = shares_amount;
    }

    GetSignBytes() {
        let msg = {
            "delegator_addr": this.delegator_addr,
            "validator_addr": this.validator_addr,
            "shares_amount": this.shares_amount
        };
        return Utils.sortObjectKeys(msg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)) {
            throw new Error("delegator_addr is empty");
        }

        if (Utils.isEmpty(this.validator_addr)) {
            throw new Error("validator_addr is empty");
        }

        if (Utils.isEmpty(this.shares_amount)) {
            throw new Error("shares must great than 0");
        }
    }

    Type() {
        return Config.iris.tx.unbond.prefix;
    }

    GetMsg() {
        const BECH32 = require('bech32');
        let delegator_key = BECH32.decode(this.delegator_addr);
        let delegator_addr = BECH32.fromWords(delegator_key.words);

        let validator_key = BECH32.decode(this.validator_addr);
        let validator_addr = BECH32.fromWords(validator_key.words);

        return {
            delegatorAddr: delegator_addr,
            validatorAddr: validator_addr,
            sharesAmount: this.shares_amount
        }
    }

    static Create(properties){
        return new MsgBeginUnbonding(properties.delegator_addr,properties.validator_addr,properties.shares_amount)
    }

}

class MsgBeginRedelegate extends Builder.Msg {

    constructor(delegator_addr, validator_src_addr, validator_dst_addr, shares_amount) {
        super(Config.iris.tx.redelegate.prefix);
        this.delegator_addr = delegator_addr;
        this.validator_src_addr = validator_src_addr;
        this.validator_dst_addr = validator_dst_addr;
        this.shares_amount = shares_amount;
    }

    GetSignBytes() {
        let msg = {
            "delegator_addr": this.delegator_addr,
            "validator_src_addr": this.validator_src_addr,
            "validator_dst_addr": this.validator_dst_addr,
            "shares": this.shares_amount
        };
        return Utils.sortObjectKeys(msg);
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)) {
            throw new Error("delegator_addr is empty");
        }

        if (Utils.isEmpty(this.validator_src_addr)) {
            throw new Error("validator_src_addr is empty");
        }

        if (Utils.isEmpty(this.validator_dst_addr)) {
            throw new Error("validator_dst_addr is empty");
        }

        if (Utils.isEmpty(this.shares_amount)) {
            throw new Error("shares_amount is empty");
        }

    }

    Type() {
        return Config.iris.tx.redelegate.prefix;
    }

    GetMsg() {
        const BECH32 = require('bech32');
        let delegator_key = BECH32.decode(this.delegator_addr);
        let delegator_addr = BECH32.fromWords(delegator_key.words);

        let validator_src_key = BECH32.decode(this.validator_src_addr);
        let validator_src_addr = BECH32.fromWords(validator_src_key.words);

        let validator_dst_key = BECH32.decode(this.validator_dst_addr);
        let validator_dst_addr = BECH32.fromWords(validator_dst_key.words);

        return {
            delegatorAddr: delegator_addr,
            validatorSrcAddr: validator_src_addr,
            validatorDstAddr: validator_dst_addr,
            sharesAmount: this.shares_amount
        }
    }

    static Create(properties){
        return new MsgBeginUnbonding(properties.delegator_addr,properties.validator_src_addr,properties.validator_dst_addr,properties.shares)
    }
}

module.exports = class Stake {
    static CreateMsgDelegate(req) {
        let delegation = {
            denom: req.msg.delegation.denom,
            amount: Utils.toString(req.msg.delegation.amount),
        };
        let msg = new MsgDelegate(req.from, req.msg.validator_addr, delegation);
        return msg;
    }

    static CreateMsgBeginUnbonding(req) {
        let shares = Dec.String(req.msg.shares_amount);
        let msg = new MsgBeginUnbonding(req.from, req.msg.validator_addr, shares);
        return msg;
    }

    static CreateMsgBeginRedelegate(req) {
        let shares = Dec.String(req.msg.shares_amount);
        let msg = new MsgBeginRedelegate(req.from, req.msg.validator_src_addr, req.msg.validator_dst_addr, shares);
        return msg;
    };

    static MsgDelegate(){
        return MsgDelegate
    }

    static MsgBeginUnbonding(){
        return MsgBeginUnbonding
    }

    static MsgBeginRedelegate(){
        return MsgBeginRedelegate
    }

};

class Dec {
    static String(share) {
        return share + ".0000000000"
    }
}