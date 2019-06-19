const Root = require('./tx/tx');
const Amino = require("../base");
const Utils = require('../../util/utils');
const Config = require('../../../config');
const BECH32 = require('bech32');
const MsgDelegate = Root.cosmos.MsgDelegate;
const MsgUndelegate = Root.cosmos.MsgUndelegate;
const MsgBeginRedelegate = Root.cosmos.MsgBeginRedelegate;

MsgDelegate.prototype.type = Config.cosmos.tx.delegate.prefix;
MsgDelegate.prototype.GetSignBytes = function () {
    let msg = {
        delegator_address: BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress),
        validator_address: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddress),
        amount: this.Amount
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgDelegate.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.DelegatorAddress)) {
        throw new Error("delegatorAddr is  empty");
    }
    if (Utils.isEmpty(this.ValidatorAddress)) {
        throw new Error("validatorAddr is  empty");
    }
};

MsgDelegate.prototype.GetMsg = function(){
    let delegator_addr = BECH32.fromWords(this.DelegatorAddress);
    let validator_addr = BECH32.fromWords(this.ValidatorAddress);

    return {
        DelegatorAddress: delegator_addr,
        ValidatorAddress: validator_addr,
        Amount: this.Amount
    }
};

MsgDelegate.prototype.GetDisplayContent = function (){
    let delegatorAddress = BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress);
    let validatorAddress = BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddress);
    return {
        i18n_tx_type:"i18n_delegate",
        i18n_delegator_addr:delegatorAddress,
        i18n_validator_addr:validatorAddress,
        i18n_amount:this.Amount,
    }
};

MsgDelegate.prototype.toJSON = function(){
    let delegatorAddress = BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress);
    let validatorAddress = BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddress);

    return {
        DelegatorAddress: delegatorAddress,
        ValidatorAddress: validatorAddress,
        Amount: this.Amount
    }
};


MsgUndelegate.prototype.type = Config.cosmos.tx.undelegate.prefix;
MsgUndelegate.prototype.GetSignBytes = function () {
    let msg = {
        delegator_address: BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress),
        validator_address: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddress),
        amount: this.Amount
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgUndelegate.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.DelegatorAddress)) {
        throw new Error("delegatorAddr is  empty");
    }
    if (Utils.isEmpty(this.ValidatorAddress)) {
        throw new Error("validatorAddr is  empty");
    }
};

MsgUndelegate.prototype.GetMsg = function(){
    let delegator_addr = BECH32.fromWords(this.DelegatorAddress);
    let validator_addr = BECH32.fromWords(this.ValidatorAddress);

    return {
        DelegatorAddress: delegator_addr,
        ValidatorAddress: validator_addr,
        Amount: this.Amount
    }
};

MsgUndelegate.prototype.GetDisplayContent = function (){
    let delegatorAddress = BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress);
    let validatorAddress = BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddress);
    return {
        i18n_tx_type:"i18n_begin_unbonding",
        i18n_delegator_addr:delegatorAddress,
        i18n_validator_addr:validatorAddress,
        i18n_shares_amount:this.Amount,
    }
};

MsgUndelegate.prototype.toJSON = function(){
    let delegatorAddress = BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress);
    let validatorAddress = BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddress);

    return {
        DelegatorAddress: delegatorAddress,
        ValidatorAddress: validatorAddress,
        Amount: this.Amount
    }
};


MsgBeginRedelegate.prototype.type = Config.cosmos.tx.beginRedelegate.prefix;
MsgBeginRedelegate.prototype.GetSignBytes = function () {
    let msg = {
        delegator_address: BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress),
        validator_src_address: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorSrcAddress),
        validator_dst_address: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorDstAddress),
        amount: this.Amount
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgBeginRedelegate.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.DelegatorAddress)) {
        throw new Error("delegatorAddr is  empty");
    }
    if (Utils.isEmpty(this.ValidatorSrcAddress)) {
        throw new Error("validatorSrcAddr is  empty");
    }
    if (Utils.isEmpty(this.ValidatorDstAddress)) {
        throw new Error("validatorDstAddr is  empty");
    }
    if (Utils.isEmpty(this.Amount)) {
        throw new Error("sharesAmount is  empty");
    }
};

MsgBeginRedelegate.prototype.GetMsg = function(){
    let delegator_addr = BECH32.fromWords(this.DelegatorAddress);
    let validator_src_addr = BECH32.fromWords(this.ValidatorSrcAddress);
    let validator_dst_addr = BECH32.fromWords(this.ValidatorDstAddress);

    return {
        DelegatorAddress: delegator_addr,
        ValidatorSrcAddress: validator_src_addr,
        ValidatorDstAddress: validator_dst_addr,
        Amount: this.Amount
    }
};

MsgBeginRedelegate.prototype.GetDisplayContent = function (){
    let delegatorAddress = BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress);
    let validatorSrcAddress = BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorSrcAddress);
    let validatorDstAddress = BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorDstAddress);

    return {
        i18n_tx_type:"i18n_redelegate",
        i18n_delegator_addr:delegatorAddress,
        i18n_validator_src_addr:validatorSrcAddress,
        i18n_validator_dst_addr:validatorDstAddress,
        i18n_shares_amount:this.Amount,
    }
};

MsgBeginRedelegate.prototype.toJSON = function(){
    let delegatorAddress = BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress);
    let validatorSrcAddress = BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorSrcAddress);
    let validatorDstAddress = BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorDstAddress);

    return {
        DelegatorAddress: delegatorAddress,
        ValidatorSrcAddress: validatorSrcAddress,
        ValidatorDstAddress: validatorDstAddress,
        Amount: this.Amount
    }
};


module.exports = class Stake {
    static createMsgDelegate(req) {
        let value = {
            denom: req.msg.amount.denom,
            amount: Utils.toString(req.msg.amount.amount),
        };

        let delegator_addr = BECH32.decode(req.from).words;
        let validator_addr = BECH32.decode(req.msg.validator_addr).words;

        return new MsgDelegate({
            DelegatorAddress:delegator_addr,
            ValidatorAddress:validator_addr,
            Amount:value,
        });
    }

    static createMsgUndelegate(req) {
        let value = {
            denom: req.msg.amount.denom,
            amount: Utils.toString(req.msg.amount.amount),
        };
        let delegator_addr = BECH32.decode(req.from).words;
        let validator_addr = BECH32.decode(req.msg.validator_addr).words;

        return new MsgUndelegate({
            DelegatorAddress:delegator_addr,
            ValidatorAddress:validator_addr,
            Amount:value,
        });
    }

    static createMsgBeginRedelegate(req) {
        let value = {
            denom: req.msg.amount.denom,
            amount: Utils.toString(req.msg.amount.amount),
        };
        let delegator_addr = BECH32.decode(req.from).words;
        let validator_src_addr = BECH32.decode(req.msg.validator_src_addr).words;
        let validator_dst_addr = BECH32.decode(req.msg.validator_dst_addr).words;

        return new MsgBeginRedelegate({
            DelegatorAddress:delegator_addr,
            ValidatorSrcAddress:validator_src_addr,
            ValidatorDstAddress:validator_dst_addr,
            Amount:value,
        });
    }
};