'use strict';

const bech32 = require('../../../common/bech32');
const Base64 = require('base64-node');
const Bank = require('./bank');

class DelegateMsg {
    constructor(delegator_addr, validator_addr, bond) {
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.bond = bond;
    }

    GetSignBytes(){
        let delegatorAddr = bech32.toBech32("cosmosaccaddr", this.delegator_addr)
        let validatorAddr = bech32.toBech32("cosmosvaladdr", this.validator_addr);

        let msg = {
            "delegator_addr": delegatorAddr,
            "validator_addr": validatorAddr,
            "bond": this.bond
        };
        return Base64.encode(JSON.stringify((msg)))
    }
}

class UnbondMsg {
    constructor(delegator_addr, validator_addr, shares) {
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.shares = shares;
    }

    GetSignBytes(){
        let delegatorAddr = bech32.toBech32("cosmosaccaddr", this.delegator_addr);
        let validatorAddr = bech32.toBech32("cosmosvaladdr", this.delegator_addr);

        let msg = {
            "delegator_addr": delegatorAddr,
            "validator_addr": validatorAddr,
            "shares": this.shares
        };
        return Base64.encode(JSON.stringify((msg)))
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