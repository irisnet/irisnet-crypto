const Config = require('../../../config');
const Amino = require('../base');
const Root = require('./tx/tx');
const BECH32 = require('bech32');
const Utils = require('../../util/utils');

const MsgSwapOrder = Root.irisnet.tx.MsgSwapOrder;
MsgSwapOrder.prototype.type = Config.iris.tx.swapOrder.prefix;
MsgSwapOrder.prototype.GetSignBytes = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr,this.input.address);
    let receiver = BECH32.encode(Config.iris.bech32.accAddr,this.output.address);
    let msg = {
        input: {
            address:sender,
            coin:this.input.coin
        },
        output: {
            address:receiver,
            coin:this.output.coin
        },
        deadline: this.deadline,
        is_buy_order: this.isBuyOrder
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};
MsgSwapOrder.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.input)) {
        throw new Error("input is  empty");
    }
    if (Utils.isEmpty(this.output)) {
        throw new Error("output is  empty");
    }
    if (Utils.isEmpty(this.deadline)) {
        throw new Error("deadline is  empty");
    }
    if (Utils.isEmpty(this.isBuyOrder)) {
        throw new Error("isBuyOrder is  empty");
    }
};
MsgSwapOrder.prototype.GetMsg = function(){
    return this
};
MsgSwapOrder.prototype.GetDisplayContent = function (){
    let sender = BECH32.encode(Config.iris.bech32.accAddr,this.input.address);
    let receiver = BECH32.encode(Config.iris.bech32.accAddr,this.output.address);
    return {
        i18n_tx_type:"i18n_swap_order",
        i18n_input:{
            address:sender,
            coin:this.input.coin
        },
        i18n_output:{
            address:receiver,
            coin:this.output.coin
        },
        i18n_deadline: this.deadline,
        i18n_is_buy_order: this.isBuyOrder
    }
};
MsgSwapOrder.prototype.toJSON = function(){
    let sender = BECH32.encode(Config.iris.bech32.accAddr,this.input.address);
    let receiver = BECH32.encode(Config.iris.bech32.accAddr,this.output.address);

    return {
        input:{
            address:sender,
            coin:this.input.coin
        },
        output:{
            address:receiver,
            coin:this.output.coin
        },
        deadline: this.deadline,
        is_buy_order: this.isBuyOrder
    }
};

module.exports = class Stake {
    static createMsgSwapOrder(req) {
        let sender = BECH32.decode(req.msg.input.address).words;
        let receiver = BECH32.decode(req.msg.output.address).words;

        let input = {
          address : sender,
          coin :   {
              denom: req.msg.input.coin.denom,
              amount: Utils.toString(req.msg.input.coin.amount),
          },
        };
        let output = {
            address : receiver,
            coin :   {
                denom: req.msg.output.coin.denom,
                amount: Utils.toString(req.msg.output.coin.amount),
            },
        };
        return new MsgSwapOrder({
            input:input,
            output:output,
            deadline:req.msg.deadline,
            isBuyOrder:req.msg.isBuyOrder,
        });
    }
};