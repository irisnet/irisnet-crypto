'use strict';

const Builder = require("../../builder");
const Utils = require('../../util/utils');
const Amino = require('./amino');
const Config = require('../../config');


//TODO
class MsgSetWithdrawAddress extends Builder.Msg {
    constructor(delegatorAddr, withdrawAddr) {
        super(Config.iris.tx.setWithdrawAddress.prefix);
        this.delegator_addr = delegatorAddr;
        this.withdraw_addr = withdrawAddr;
    }

    GetSignBytes() {
        let msg = {
            "delegator_addr": this.delegator_addr,
            "withdraw_addr": this.withdraw_addr,
        };
        let sortMsg = Utils.sortObjectKeys(msg);
        return Amino.MarshalJSON(this.Type(), sortMsg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)) {
            throw new Error("delegatorAddr is empty");
        }

        if (Utils.isEmpty(this.withdraw_addr)) {
            throw new Error("withdrawAddr is empty");
        }
    }

    Type() {
        return Config.iris.tx.setWithdrawAddress.prefix;
    }

    GetMsg() {
        const BECH32 = require('bech32');
        let delegator_key = BECH32.decode(this.delegator_addr);
        let delegator_addr = BECH32.fromWords(delegator_key.words);

        let withdraw_addr_key = BECH32.decode(this.withdraw_addr);
        let withdraw_addr_addr = BECH32.fromWords(withdraw_addr_key.words);

        return {
            delegatorAddr: delegator_addr,
            withdrawAddr: withdraw_addr_addr
        }
    }

    static Create(properties){
        return new MsgSetWithdrawAddress(properties.delegator_addr,properties.withdraw_addr)
    }
}

class MsgWithdrawDelegatorRewardsAll extends Builder.Msg {
    constructor(delegatorAddr) {
        super(Config.iris.tx.withdrawDelegationRewardsAll.prefix);
        this.delegator_addr = delegatorAddr;
    }

    GetSignBytes() {
        let msg = {
            "delegator_addr": this.delegator_addr,
        };
        let sortMsg = Utils.sortObjectKeys(msg);
        return Amino.MarshalJSON(this.Type(), sortMsg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)) {
            throw new Error("delegatorAddr is empty");
        }
    }

    Type() {
        return Config.iris.tx.withdrawDelegationRewardsAll.prefix;
    }

    GetMsg() {
        const BECH32 = require('bech32');
        let delegator_key = BECH32.decode(this.delegator_addr);
        let delegator_addr = BECH32.fromWords(delegator_key.words);

        return {
            delegatorAddr: delegator_addr,
        }
    }

    static Create(properties){
        return new MsgWithdrawDelegatorRewardsAll(properties.delegator_addr)
    }
}

class MsgWithdrawDelegatorReward extends Builder.Msg {
    constructor(delegatorAddr,validator_addr) {
        super(Config.iris.tx.withdrawDelegationReward.prefix);
        this.delegator_addr = delegatorAddr;
        this.validator_addr = validator_addr;
    }

    GetSignBytes() {
        let msg = {
            "delegator_addr": this.delegator_addr,
            "validator_addr": this.validator_addr,
        };
        let sortMsg = Utils.sortObjectKeys(msg);
        return Amino.MarshalJSON(this.Type(), sortMsg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)) {
            throw new Error("delegatorAddr is empty");
        }
        if (Utils.isEmpty(this.validator_addr)) {
            throw new Error("validator_addr is empty");
        }
    }

    Type() {
        return Config.iris.tx.withdrawDelegationReward.prefix;
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
        }
    }

    static Create(properties){
        return new MsgWithdrawDelegatorReward(properties.delegator_addr,properties.validator_addr)
    }
}

module.exports = class Distribution {
    static GreateMsgSetWithdrawAddress(req) {
        return new MsgSetWithdrawAddress(req.from, req.msg.withdraw_addr);
    }

    static GreateMsgWithdrawDelegatorRewardsAll(req) {
        return new MsgWithdrawDelegatorRewardsAll(req.from);
    }

    static GreateMsgWithdrawDelegatorReward(req) {
        return new MsgWithdrawDelegatorReward(req.from,req.msg.validator_addr);
    }

    static MsgSetWithdrawAddress(){
        return MsgSetWithdrawAddress
    }

    static MsgWithdrawDelegatorRewardsAll(){
        return MsgWithdrawDelegatorRewardsAll
    }

    static MsgWithdrawDelegatorReward(){
        return MsgWithdrawDelegatorReward
    }
};