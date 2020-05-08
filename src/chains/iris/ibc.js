const Root = require('./tx/tx');
const Amino = require("../base");
const Utils = require('../../util/utils');
const Config = require('../../../config');
const BECH32 = require('bech32');
const MsgTransfer = Root.cosmos.MsgTransfer;

MsgTransfer.prototype.type = Config.cosmos.tx.ibcTransfer.prefix;
MsgTransfer.prototype.GetSignBytes = function () {
    let msg = {
        source_port: this.SourcePort,
        source_channel: this.SourceChannel,
        dest_height: this.DestHeight,
        amount: this.Amount,
        sender: this.Sender,
        receiver: this.Receiver
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};

MsgTransfer.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.SourcePort)) {
        throw new Error("SourcePort is  empty");
    }
    if (Utils.isEmpty(this.SourceChannel)) {
        throw new Error("SourceChannel is  empty");
    }
    if (Utils.isEmpty(this.DestHeight)) {
        throw new Error("DestHeight is  empty");
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
};

MsgTransfer.prototype.GetMsg = function () {
    return {
        SourcePort: this.SourcePort,
        SourceChannel: this.SourceChannel,
        DestHeight: this.DestHeight,
        Amount: this.Amount,
        Sender: this.Sender,
        Receiver: this.Receiver
    }
};

MsgTransfer.prototype.GetDisplayContent = function () {
    return {
        i18n_tx_type: "i18n_ibc_transfer",
        i18n_source_port: this.SourcePort,
        i18n_source_channel: this.SourceChannel,
        i18n_dest_height: this.DestHeight,
        i18n_amount: this.Amount,
        i18n_sender: this.Sender,
        i18n_receiver: this.Receiver
    }
};

MsgTransfer.prototype.toJSON = function () {
    return {
        SourcePort: this.SourcePort,
        SourceChannel: this.SourceChannel,
        DestHeight: this.DestHeight,
        Amount: this.Amount,
        Sender: this.Sender,
        Receiver: this.Receiver
    }
};

module.exports = class IBC {
    static createMsgTransfer(req) {
        return new MsgTransfer({
            SourcePort: req.msg.source_port,
            SourceChannel: req.msg.source_channel,
            DestHeight: req.msg.dest_height,
            Amount: Utils.toString(req.msg.amount),
            Sender: req.from,
            Receiver: req.msg.receiver
        });
    }
};
