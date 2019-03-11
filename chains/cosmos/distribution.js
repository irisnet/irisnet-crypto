const Root = require('./tx/tx');
const Amino = require("../base");
const Utils = require('../../util/utils');
const Config = require('../../config');
const BECH32 = require('bech32');
const MsgSetWithdrawAddress = Root.cosmos.MsgSetWithdrawAddress;
const MsgWithdrawDelegatorReward = Root.cosmos.MsgWithdrawDelegatorReward;
const MsgWithdrawValidatorCommission = Root.cosmos.MsgWithdrawValidatorCommission;

MsgSetWithdrawAddress.prototype.type = Config.cosmos.tx.setWithdrawAddress.prefix;
MsgSetWithdrawAddress.prototype.GetSignBytes = function () {
    let msg = {
        delegator_address: BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddr),
        withdraw_address: BECH32.encode(Config.cosmos.bech32.accAddr,this.WithdrawAddr),
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgSetWithdrawAddress.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.DelegatorAddr)) {
        throw new Error("delegatorAddr is  empty");
    }
    if (Utils.isEmpty(this.WithdrawAddr)) {
        throw new Error("WithdrawAddr is  empty");
    }
};

MsgSetWithdrawAddress.prototype.GetMsg = function(){
    const BECH32 = require('bech32');
    let delegator_addr = BECH32.fromWords(this.DelegatorAddr);
    let withdraw_addr = BECH32.fromWords(this.WithdrawAddr);

    return {
        DelegatorAddr: delegator_addr,
        WithdrawAddr: withdraw_addr,
    }
};

MsgWithdrawDelegatorReward.prototype.type = Config.cosmos.tx.withdrawDelegatorReward.prefix;
MsgWithdrawDelegatorReward.prototype.GetSignBytes = function () {
    let msg = {
        delegator_address: BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddr),
        validator_address: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddr),
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgWithdrawDelegatorReward.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.DelegatorAddr)) {
        throw new Error("delegatorAddr is  empty");
    }
    if (Utils.isEmpty(this.ValidatorAddr)) {
        throw new Error("validatorAddr is  empty");
    }
};

MsgWithdrawDelegatorReward.prototype.GetMsg = function(){
    const BECH32 = require('bech32');
    let delegator_addr = BECH32.fromWords(this.DelegatorAddr);
    let validator_addr = BECH32.fromWords(this.ValidatorAddr);

    return {
        DelegatorAddr: delegator_addr,
        ValidatorAddr: validator_addr
    }
};

MsgWithdrawValidatorCommission.prototype.type = Config.cosmos.tx.withdrawValidatorCommission.prefix;
MsgWithdrawValidatorCommission.prototype.GetSignBytes = function () {
    let msg = {
        validator_address: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddr),
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgWithdrawValidatorCommission.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.ValidatorAddr)) {
        throw new Error("validatorAddr is  empty");
    }
};

MsgWithdrawValidatorCommission.prototype.GetMsg = function(){
    const BECH32 = require('bech32');
    let validator_addr = BECH32.fromWords(this.ValidatorAddr);

    return {
        ValidatorAddr: validator_addr,
    }
};

module.exports = class Distribution {
    static CreateMsgSetWithdrawAddress(req) {
        let delegator_addr = BECH32.decode(req.from).words;
        let withdraw_addr = BECH32.decode(req.msg.withdraw_addr).words;
        return new MsgSetWithdrawAddress({
            DelegatorAddr:delegator_addr,
            WithdrawAddr:withdraw_addr,
        });
    }
    static CreateMsgWithdrawDelegatorReward(req) {
        let delegator_addr = BECH32.decode(req.from).words;
        let validator_addr = BECH32.decode(req.msg.validator_addr).words;
        return new MsgWithdrawDelegatorReward({
            DelegatorAddr:delegator_addr,
            ValidatorAddr:validator_addr,
        });
    }
    static CreateMsgWithdrawValidatorCommission(req) {
        let validator_addr = BECH32.decode(req.msg.validator_addr).words;
        return new MsgWithdrawValidatorCommission({
            ValidatorAddr:validator_addr,
        });
    }
};