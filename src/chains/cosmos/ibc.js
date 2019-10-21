const Root = require('./tx/tx');
const Amino = require("../base");
const Utils = require('../../util/utils');
const Config = require('../../../config');
const BECH32 = require('bech32');
const MsgTransfer = Root.cosmos.MsgTransfer;

MsgTransfer.prototype.type = Config.cosmos.tx.ibcTransfer.prefix;
MsgTransfer.prototype.GetSignBytes = function () {
    let msg = {
        src_port: this.SrcPort,
        src_channel: this.SrcChannel,
        denomination: this.Denomination,
        amount: this.Amount,
        sender: BECH32.encode(Config.cosmos.bech32.valAddr, this.Sender),
        receiver: this.Receiver,
        source: this.Source
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgTransfer.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.SrcPort)) {
        throw new Error("SrcPort is  empty");
    }
    if (Utils.isEmpty(this.SrcChannel)) {
        throw new Error("SrcChannel is  empty");
    }
    if (Utils.isEmpty(this.Denomination)) {
        throw new Error("Denomination is  empty");
    }
    if (Utils.isEmpty(this.Amount)) {
        throw new Error("Amount is  empty");
    }
    if (Utils.isEmpty(this.Sender)) {
        throw new Error("Sender is  empty");
    }
    if (Utils.isEmpty(this.Receiver)) {
        throw new Error("Receiver is  empty");
    }
    if (Utils.isEmpty(this.Source)) {
        throw new Error("Source is  empty");
    }
};

MsgTransfer.prototype.GetMsg = function () {
    let sender = BECH32.fromWords(this.Sender);

    return {
        SrcPort: this.SrcPort,
        SrcChannel: this.SrcChannel,
        Denomination: this.Denomination,
        Amount: this.Amount,
        Sender: sender,
        Receiver: this.Receiver,
        Source: this.Source
    }
};

MsgTransfer.prototype.GetDisplayContent = function () {
    let sender = BECH32.encode(Config.cosmos.bech32.accAddr, this.Sender);
    return {
        i18n_tx_type: "i18n_ibc_transfer",
        i18n_src_port: this.SrcPort,
        i18n_src_channel: this.SrcChannel,
        i18n_denomination: this.Denomination,
        i18n_amount: this.Amount,
        i18n_sender: sender,
        i18n_receiver: this.Receiver,
        i18n_source: this.Source
    }
};

MsgTransfer.prototype.toJSON = function () {
    let sender = BECH32.encode(Config.cosmos.bech32.accAddr, this.Sender);
    return {
        SrcPort: this.SrcPort,
        SrcChannel: this.SrcChannel,
        Denomination: this.Denomination,
        Amount: this.Amount,
        Sender: sender,
        Receiver: this.Receiver,
        Source: this.Source
    }
};

module.exports = class IBC {
    static createMsgTransfer(req) {
        let sender = BECH32.decode(req.from).words;
        return new MsgTransfer({
            SrcPort: req.msg.src_port,
            SrcChannel: req.msg.src_channel,
            Denomination: req.msg.denomination,
            Amount: Utils.toString(req.msg.amount),
            Sender: sender,
            Receiver: req.msg.receiver,
            Source: req.msg.source
        });
    }
};
