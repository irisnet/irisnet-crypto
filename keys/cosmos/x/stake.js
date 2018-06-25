const Hex = require("../../hex");
const Bech32 = require('bech32');
const Base64 = require('base64-node');
const PrivKey = require('../privKey');
const Bank = require('./bank');

let DelegateMsg = class DelegateMsg {
    constructor(delegator_addr, validator_addr, bond) {
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.bond = bond;
    }
};

let UnbondMsg = class DelegateMsg {
    constructor(delegator_addr, validator_addr, shares) {
        this.delegator_addr = delegator_addr;
        this.validator_addr = validator_addr;
        this.shares = shares;
    }
};

DelegateMsg.prototype.GetSignBytes = function () {
    let delegatorAddrByte = Bech32.toWords(Buffer.from(this.delegator_addr, 'hex'));
    let delegatorAddr = Bech32.encode("cosmosaccaddr", delegatorAddrByte);

    let validatorAddrByte = Bech32.toWords(Buffer.from(this.validator_addr, 'hex'));
    let validatorAddr = Bech32.encode("cosmosvaladdr", validatorAddrByte);

    let msg = {
        "delegator_addr": delegatorAddr,
        "validator_addr": validatorAddr,
        "shares": this.shares
    };
    return Base64.encode(JSON.stringify((msg)))

};

UnbondMsg.prototype.GetSignBytes = function () {
    let delegatorAddrByte = Bech32.toWords(Buffer.from(this.delegator_addr, 'hex'));
    let delegatorAddr = Bech32.encode("cosmosaccaddr", delegatorAddrByte);

    let validatorAddrByte = Bech32.toWords(Buffer.from(this.validator_addr, 'hex'));
    let validatorAddr = Bech32.encode("cosmosvaladdr", validatorAddrByte);

    let msg = {
        "delegator_addr": delegatorAddr,
        "validator_addr": validatorAddr,
        "bond": this.bond
    };
    return Base64.encode(JSON.stringify((msg)))

};

let Delegate = function (acc, validatorAddr, coins, fee, gas) {
    let stdFee = new Bank.StdFee(fee, gas);
    let msg = new DelegateMsg(acc.address, validatorAddr, coins);
    let signMsg = new Bank.StdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg);
    let signbyte = PrivKey.Sign(acc.private_key, signMsg.Bytes());
    let signs = [new Bank.StdSignature(Hex.hexToBytes(acc.public_key), signbyte, acc.account_number, acc.sequence)];
    let stdTx = new Bank.StdTx(signMsg.msg, signMsg.fee, signs, "delegate");
    return stdTx
};

let Unbond = function (acc, validatorAddr, shares, fee, gas) {
    let stdFee = new Bank.StdFee(fee, gas);
    let msg = new UnbondMsg(acc.address, validatorAddr, shares);
    let signMsg = new Bank.StdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg);
    let signbyte = PrivKey.Sign(acc.private_key, signMsg.Bytes());
    let signs = [new Bank.StdSignature(Hex.hexToBytes(acc.public_key), signbyte, acc.account_number, acc.sequence)];
    let stdTx = new Bank.StdTx(signMsg.msg, signMsg.fee, signs, "delegate");
    return stdTx
};

module.exports = {
    Delegate: Delegate,
    Unbond: Unbond,
};