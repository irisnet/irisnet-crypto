const Root = require('./tx/tx');
const Amino = require("../base");
const Utils = require('../../util/utils');
const Config = require('../../../config');
const BECH32 = require('bech32');
const MsgSetWithdrawAddress = Root.cosmos.MsgSetWithdrawAddress;
const MsgWithdrawDelegatorReward = Root.cosmos.MsgWithdrawDelegatorReward;
const MsgWithdrawValidatorCommission = Root.cosmos.MsgWithdrawValidatorCommission;

MsgSetWithdrawAddress.prototype.type = Config.cosmos.tx.setWithdrawAddress.prefix;
MsgSetWithdrawAddress.prototype.GetSignBytes = function () {
    let msg = {
        delegator_address: BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress),
        withdraw_address: BECH32.encode(Config.cosmos.bech32.accAddr,this.WithdrawAddress),
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgSetWithdrawAddress.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.DelegatorAddress)) {
        throw new Error("delegatorAddr is  empty");
    }
    if (Utils.isEmpty(this.WithdrawAddress)) {
        throw new Error("WithdrawAddr is  empty");
    }
};

MsgSetWithdrawAddress.prototype.GetMsg = function(){
    let delegator_addr = BECH32.fromWords(this.DelegatorAddress);
    let withdraw_addr = BECH32.fromWords(this.WithdrawAddress);

    return {
        DelegatorAddress: delegator_addr,
        WithdrawAddress: withdraw_addr,
    }
};

MsgSetWithdrawAddress.prototype.toJSON = function(){
    let delegator_addr = BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress);
    let withdraw_addr = BECH32.encode(Config.cosmos.bech32.accAddr,this.WithdrawAddress);
    return {
        DelegatorAddress: delegator_addr,
        WithdrawAddress: withdraw_addr,
    }
};

MsgSetWithdrawAddress.prototype.GetDisplayContent = function (){};

MsgWithdrawDelegatorReward.prototype.type = Config.cosmos.tx.withdrawDelegatorReward.prefix;
MsgWithdrawDelegatorReward.prototype.GetSignBytes = function () {
    let msg = {
        delegator_address: BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress),
        validator_address: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddress),
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgWithdrawDelegatorReward.prototype.toJSON = function(){
    let delegatorAddr = BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress);
    let validatorAddress = BECH32.encode(Config.cosmos.bech32.accAddr,this.ValidatorAddress);
    return {
        DelegatorAddress: delegatorAddr,
        ValidatorAddress: validatorAddress,
    }
};

MsgWithdrawDelegatorReward.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.DelegatorAddress)) {
        throw new Error("delegatorAddr is  empty");
    }
    if (Utils.isEmpty(this.ValidatorAddress)) {
        throw new Error("validatorAddr is  empty");
    }
};

MsgWithdrawDelegatorReward.prototype.GetMsg = function(){
    let delegator_addr = BECH32.fromWords(this.DelegatorAddress);
    let validator_addr = BECH32.fromWords(this.ValidatorAddress);

    return {
        DelegatorAddress: delegator_addr,
        ValidatorAddress: validator_addr
    }
};
MsgWithdrawDelegatorReward.prototype.GetDisplayContent = function (){
    let delegatorAddress = BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddress);
    let validatorAddress = BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddress);

    return {
        i18n_tx_type:"i18n_withdraw_delegation_reward",
        i18n_delegator_addr:delegatorAddress,
        i18n_validator_addr:validatorAddress,
    }
};


MsgWithdrawValidatorCommission.prototype.type = Config.cosmos.tx.withdrawValidatorCommission.prefix;
MsgWithdrawValidatorCommission.prototype.GetSignBytes = function () {
    let msg = {
        validator_address: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddress),
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgWithdrawValidatorCommission.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.ValidatorAddress)) {
        throw new Error("validatorAddr is  empty");
    }
};

MsgWithdrawValidatorCommission.prototype.GetMsg = function(){
    let validator_addr = BECH32.fromWords(this.ValidatorAddress);

    return {
        ValidatorAddress: validator_addr,
    }
};
MsgWithdrawValidatorCommission.prototype.GetDisplayContent = function (){};
MsgWithdrawValidatorCommission.prototype.toJSON = function(){
    let validatorAddress = BECH32.encode(Config.cosmos.bech32.accAddr,this.ValidatorAddress);
    return {
        ValidatorAddress: validatorAddress,
    }
};

module.exports = class Distribution {
    static CreateMsgSetWithdrawAddress(req) {
        let delegator_addr = BECH32.decode(req.from).words;
        let withdraw_addr = BECH32.decode(req.msg.withdraw_addr).words;
        return new MsgSetWithdrawAddress({
            DelegatorAddress:delegator_addr,
            WithdrawAddress:withdraw_addr,
        });
    }
    static CreateMsgWithdrawDelegatorReward(req) {
        let delegator_addr = BECH32.decode(req.from).words;
        let validator_addr = BECH32.decode(req.msg.validator_addr).words;
        return new MsgWithdrawDelegatorReward({
            DelegatorAddress:delegator_addr,
            ValidatorAddress:validator_addr,
        });
    }
    static CreateMsgWithdrawValidatorCommission(req) {
        let validator_addr = BECH32.decode(req.from).words;
        return new MsgWithdrawValidatorCommission({
            ValidatorAddress:validator_addr,
        });
    }
};