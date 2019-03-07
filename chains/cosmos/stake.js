const Root = require('./tx/tx');
const Amino = require("../base");
const Utils = require('../../util/utils');
const Config = require('../../config');
const BECH32 = require('bech32');
const MsgDelegate = Root.cosmos.MsgDelegate;
const MsgUndelegate = Root.cosmos.MsgUndelegate;

MsgDelegate.prototype.type = Config.cosmos.tx.delegate.prefix;
MsgDelegate.prototype.GetSignBytes = function () {
    let msg = {
        delegator_addr: BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddr),
        validator_addr: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddr),
        value: this.Value
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgDelegate.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.DelegatorAddr)) {
        throw new Error("delegatorAddr is  empty");
    }
    if (Utils.isEmpty(this.ValidatorAddr)) {
        throw new Error("validatorAddr is  empty");
    }
};

MsgDelegate.prototype.GetMsg = function(){
    const BECH32 = require('bech32');
    let delegator_addr = BECH32.fromWords(this.DelegatorAddr);
    let validator_addr = BECH32.fromWords(this.ValidatorAddr);

    return {
        DelegatorAddr: delegator_addr,
        ValidatorAddr: validator_addr,
        Value: this.Value
    }
};


MsgUndelegate.prototype.type = Config.cosmos.tx.undelegate.prefix;
MsgUndelegate.prototype.GetSignBytes = function () {
    let msg = {
        delegator_addr: BECH32.encode(Config.cosmos.bech32.accAddr,this.DelegatorAddr),
        validator_addr: BECH32.encode(Config.cosmos.bech32.valAddr,this.ValidatorAddr),
        shares_amount: this.SharesAmount
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgUndelegate.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.DelegatorAddr)) {
        throw new Error("delegatorAddr is  empty");
    }
    if (Utils.isEmpty(this.ValidatorAddr)) {
        throw new Error("validatorAddr is  empty");
    }
};

MsgUndelegate.prototype.GetMsg = function(){
    const BECH32 = require('bech32');
    let delegator_addr = BECH32.fromWords(this.DelegatorAddr);
    let validator_addr = BECH32.fromWords(this.ValidatorAddr);

    return {
        DelegatorAddr: delegator_addr,
        ValidatorAddr: validator_addr,
        SharesAmount: this.SharesAmount
    }
};


module.exports = class Stake {
    static createMsgDelegate(req) {
        let value = {
            denom: req.msg.delegation.denom,
            amount: Utils.toString(req.msg.delegation.amount),
        };

        let delegator_addr = BECH32.decode(req.from).words;
        let validator_addr = BECH32.decode(req.msg.validator_addr).words;

        return new MsgDelegate({
            DelegatorAddr:delegator_addr,
            ValidatorAddr:validator_addr,
            Value:value,
        });
    }

    static createMsgUndelegate(req) {
        let shares_amount = Dec.String(req.msg.shares_amount);
        let delegator_addr = BECH32.decode(req.from).words;
        let validator_addr = BECH32.decode(req.msg.validator_addr).words;

        return new MsgUndelegate({
            DelegatorAddr:delegator_addr,
            ValidatorAddr:validator_addr,
            SharesAmount:shares_amount,
        });
    }
};

class Dec {
    static String(share) {
        if (share.indexOf(".") === -1) {
            share = share + ".000000000000000000"
        }else {
            let padLen = 18 - share.split(".")[1].length;
            for(let i = 0; i < padLen; i++){
                share = `${share}0`
            }
        }
        return share
    }
}