'use strict';

const Bank = require('./bank');
const Builder = require("../../builder");
const Utils = require('../../util/utils');

class DelegateMsg extends Builder.SignMsg{
    constructor(delegator_addr, validator_addr, bond) {
        super();
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.bond = bond;
    }

    GetSignBytes() {
        //let delegatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_ACCADDR, this.delegator_addr)
        //let validatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_VALADDR, this.validator_addr);

        let msg = {
            "delegator_addr": this.delegator_addr,
            "validator_addr": this.validator_addr,
            "bond": this.bond
        };
        return Utils.sortObjectKeys(msg)
        //return Base64.encode(JSON.stringify((msg)))
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)){
            throw new Error("delegator_addr is empty");
        }

        if (Utils.isEmpty(this.validator_addr)){
            throw new Error("validator_addr is empty");
        }

        if (Utils.isEmpty(this.bond)){
            throw new Error("bond must great than 0");
        }
    }

}

class BeginUnbondingMsg extends Builder.Validator{
    constructor(delegator_addr, validator_addr, shares) {
        super();
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.shares = shares;
    }

    GetSignBytes() {
        //let delegatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_ACCADDR, this.delegator_addr);
        //let validatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_VALADDR, this.validator_addr);

        let msg = {
            "delegator_addr": this.delegator_addr,
            "validator_addr": this.validator_addr,
            "shares_amount" : this.shares
        };
        //return Base64.encode(JSON.stringify((msg)))
        return Utils.sortObjectKeys(msg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)){
            throw new Error("delegator_addr is empty");
        }

        if (Utils.isEmpty(this.validator_addr)){
            throw new Error("validator_addr is empty");
        }

        if (Utils.isEmpty(this.shares)){
            throw new Error("shares must great than 0");
        }
    }
}

class CompleteUnbondingMsg extends Builder.Validator{
    constructor(delegator_addr, validator_addr) {
        super();
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
    }

    GetSignBytes() {
        //let delegatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_ACCADDR, this.delegator_addr);
        //let validatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_VALADDR, this.validator_addr);

        let msg = {
            "delegator_addr": this.delegator_addr,
            "validator_addr": this.validator_addr
        };
        //return Base64.encode(JSON.stringify((msg)))
        return Utils.sortObjectKeys(msg)
    }

    ValidateBasic() {
        if (Utils.isEmpty(this.delegator_addr)){
            throw new Error("delegator_addr is empty");
        }

        if (Utils.isEmpty(this.validator_addr)){
            throw new Error("validator_addr is empty");
        }

    }
}

module.exports = class Stake {
    static GetDelegateSignMsg(acc, validatorAddr, coins, fee, gas) {
        let stdFee = Bank.NewStdFee(fee, gas);
        let msg = new DelegateMsg(acc.address, validatorAddr, coins);
        let signMsg = Bank.NewStdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg);
        return signMsg;
    }

    static GetBeginUnbondingMsg(acc, validatorAddr, shares, fee, gas) {
        let stdFee = Bank.NewStdFee(fee, gas);
        let msg = new BeginUnbondingMsg(acc.address, validatorAddr, shares);
        let signMsg = Bank.NewStdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg);
        return signMsg;
    }

    static GetCompleteUnbondingMsg(acc, validatorAddr, shares, fee, gas) {
        let stdFee = Bank.NewStdFee(fee, gas);
        let msg = new CompleteUnbondingMsg(acc.address, validatorAddr);
        let signMsg = Bank.NewStdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg);
        return signMsg;
    };

};