'use strict';

const bech32 = require('../../util/bech32');
const Constants = require('./constants').IrisNetConfig;
const Base64 = require('base64-node');
const Bank = require('./bank');
const Builder = require("../../builder");

class DelegateMsg extends Builder.Validator{
    constructor(delegator_addr, validator_addr, bond) {
        super();
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.bond = bond;
    }

    GetSignBytes() {
        let delegatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_ACCADDR, this.delegator_addr)
        let validatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_VALADDR, this.validator_addr);

        let msg = {
            "delegator_addr": delegatorAddr,
            "validator_addr": validatorAddr,
            "bond": this.bond
        };
        return Base64.encode(JSON.stringify((msg)))
    }

    ValidateBasic() {
        if (!this.delegator_addr || this.delegator_addr.length ==0){
            throw new Error("delegator_addr is empty");
        }

        if (!this.validator_addr || this.validator_addr.length ==0){
            throw new Error("validator_addr is empty");
        }
    }

}

class UnbondMsg extends Builder.Validator{
    constructor(delegator_addr, validator_addr, shares) {
        super();
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.shares = shares;
    }

    GetSignBytes() {
        let delegatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_ACCADDR, this.delegator_addr);
        let validatorAddr = bech32.toBech32(Constants.PREFIX_BECH32_VALADDR, this.validator_addr);

        let msg = {
            "delegator_addr": delegatorAddr,
            "validator_addr": validatorAddr,
            "shares": this.shares
        };
        return Base64.encode(JSON.stringify((msg)))
    }

    ValidateBasic() {
        if (!this.delegator_addr || this.delegator_addr.length ==0){
            throw new Error("delegator_addr is empty");
        }

        if (!this.validator_addr || this.validator_addr.length ==0){
            throw new Error("validator_addr is empty");
        }

        if (this.shares < 0 ){
            throw new Error("shares must > 0");
        }
    }
}


let getDelegateSignMsg = function (acc, validatorAddr, coins, fee, gas) {
    let stdFee = new Bank.StdFee(fee, gas);
    let msg = new DelegateMsg(acc.address, validatorAddr, coins);
    let signMsg = new Bank.StdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg);
    return signMsg;
};

let getUnbondSignMsg = function (acc, validatorAddr, shares, fee, gas) {
    let stdFee = new Bank.StdFee(fee, gas);
    let msg = new UnbondMsg(acc.address, validatorAddr, shares);
    let signMsg = new Bank.StdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg);
    return signMsg;
};


module.exports = {
    getDelegateSignMsg,
    getUnbondSignMsg,
};