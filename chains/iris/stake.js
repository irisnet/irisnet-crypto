'use strict';

const Bank = require('./bank');
const Builder = require("../../builder");
const Utils = require('../../util/utils');
const Amino = require('./amino');

class DelegateMsg extends Builder.Msg{
    constructor(delegator_addr, validator_addr, delegation) {
        super("cosmos-sdk/MsgDelegate");
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
        return Amino.MarshalJSON(this.Type(),sortMsg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)){
            throw new Error("delegator_addr is empty");
        }

        if (Utils.isEmpty(this.validator_addr)){
            throw new Error("validator_addr is empty");
        }

        if (Utils.isEmpty(this.delegation)){
            throw new Error("delegation must great than 0");
        }
    }

    Type(){
        return "cosmos-sdk/MsgDelegate";
    }

    GetMsg(){
        const BECH32 = require('bech32');
        let delegator_key = BECH32.decode(this.delegator_addr);
        let delegator_addr = BECH32.fromWords(delegator_key.words);

        let validator_key = BECH32.decode(this.validator_addr);
        let validator_addr = BECH32.fromWords(validator_key.words);

        return {
            delegatorAddr : delegator_addr,
            validatorAddr : validator_addr,
            delegation : this.delegation
        }
    }

}

class BeginUnbondingMsg extends Builder.Msg{
    constructor(delegator_addr, validator_addr, shares_amount) {
        super("cosmos-sdk/BeginUnbonding");
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.shares_amount = shares_amount;
    }

    GetSignBytes() {

        let msg = {
            "delegator_addr": this.delegator_addr,
            "validator_addr": this.validator_addr,
            "shares_amount" : this.shares_amount
        };
        return Utils.sortObjectKeys(msg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)){
            throw new Error("delegator_addr is empty");
        }

        if (Utils.isEmpty(this.validator_addr)){
            throw new Error("validator_addr is empty");
        }

        if (Utils.isEmpty(this.shares_amount)){
            throw new Error("shares must great than 0");
        }
    }

    Type(){
        return "cosmos-sdk/BeginUnbonding";
    }

}

class CompleteUnbondingMsg extends Builder.Msg{

    constructor(delegator_addr, validator_addr) {
        super("cosmos-sdk/CompleteUnbonding");
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
    }

    GetSignBytes() {
        let msg = {
            "delegator_addr": this.delegator_addr,
            "validator_addr": this.validator_addr
        };
        let sortMsg = Utils.sortObjectKeys(msg);
        return Amino.MarshalJSON(this.Type(),sortMsg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)){
            throw new Error("delegator_addr is empty");
        }

        if (Utils.isEmpty(this.validator_addr)){
            throw new Error("validator_addr is empty");
        }

    }

    Type(){
        return "cosmos-sdk/CompleteUnbonding";
    }
}

module.exports = class Stake {
    static GetDelegateSignMsg(acc, validatorAddr, coins, fee, gas, memo) {
        let stdFee = Bank.NewStdFee(fee, gas);
        let msg = new DelegateMsg(acc.address, validatorAddr, coins);
        let signMsg = Bank.NewStdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg,memo);
        return signMsg;
    }

    static GetBeginUnbondingMsg(acc, validatorAddr, shares, fee, gas, memo) {
        let stdFee = Bank.NewStdFee(fee, gas);
        let msg = new BeginUnbondingMsg(acc.address, validatorAddr, shares);
        let signMsg = Bank.NewStdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg,memo);
        return signMsg;
    }

    static GetCompleteUnbondingMsg(acc, validatorAddr, shares, fee, gas, memo) {
        let stdFee = Bank.NewStdFee(fee, gas);
        let msg = new CompleteUnbondingMsg(acc.address, validatorAddr);
        let signMsg = Bank.NewStdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg,memo);
        return signMsg;
    };

    static NewDelegateMsg(delegator_addr, validator_addr, delegation){
        return new DelegateMsg(delegator_addr, validator_addr, delegation);
    }

};