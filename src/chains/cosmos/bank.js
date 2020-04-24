'use strict';

const Utils = require('../../util/utils');
const Config = require('../../../config');
const Amino = require("../base");
const Root = require('./tx/tx');
const BECH32 = require('bech32');

const MsgSend = Root.cosmos.MsgSend;
MsgSend.prototype.GetSignBytes = function () {

    let msg = {
        "from_address": this.FromAddress,
        "to_address": this.ToAddress,
        "amount": this.Amount
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgSend.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.FromAddress)) {
        throw new Error("sender is  empty");
    }
    if (Utils.isEmpty(this.ToAddress)) {
        throw new Error("sender is  empty");
    }
};

MsgSend.prototype.GetMsg = function(){
    const BECH32 = require('bech32');
    let from_address = this.FromAddress;
    let to_address = this.ToAddress;

    return {
        FromAddress: from_address,
        ToAddress: to_address,
        Amount: this.Amount
    }
};

MsgSend.prototype.type = Config.cosmos.tx.transfer.prefix;
MsgSend.prototype.GetDisplayContent = function (){
    let from = this.FromAddress;
    let to = this.ToAddress;
    return {
        i18n_tx_type:"i18n_transfer",
        i18n_from:from,
        i18n_to:to,
        i18n_amount:this.Amount,
    }
};

MsgSend.prototype.toJSON = function(){
    let from = this.FromAddress;
    let to = this.ToAddress;
    return {
        FromAddress: from,
        ToAddress: to,
        Amount: this.Amount
    }
};


module.exports = class Bank {
    static create(req) {
        let coins = [];
        if (!Utils.isEmpty(req.msg.coins)) {
            req.msg.coins.forEach(function(item) {
                coins.push({
                    denom: item.denom,
                    amount: Utils.toString(item.amount),
                });
            });
        }
        let from = req.from;
        let to = req.msg.to;
        let msg = new MsgSend({
            FromAddress:from,
            ToAddress:to,
            Amount:coins,
        });
        return msg
    }
};