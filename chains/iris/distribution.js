'use strict';

const Builder = require("../../builder");
const Utils = require('../../util/utils');
const Amino = require('./amino');
const Config = require('../../config');

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

    GetDisplayContent(){
        return {
            i18n_tx_type:"i18n_rwithdraw_delegation_rewards_all",
            i18n_delegator_addr:this.delegator_addr,
        }
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

    GetDisplayContent(){
        return {
            i18n_tx_type:"i18n_withdraw_delegation_reward",
            i18n_delegator_addr:this.delegator_addr,
            i18n_validator_addr:this.validator_addr,
        }
    }
}

module.exports = class Distribution {

    static CreateMsgWithdrawDelegatorRewardsAll(req) {
        return new MsgWithdrawDelegatorRewardsAll(req.from);
    }

    static CreateMsgWithdrawDelegatorReward(req) {
        return new MsgWithdrawDelegatorReward(req.from,req.msg.validator_addr);
    }
};