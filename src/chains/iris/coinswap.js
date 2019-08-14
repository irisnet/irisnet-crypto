const Config = require('../../../config');
const Amino = require('../base');
const Root = require('./tx/tx');
const BECH32 = require('bech32');
const Utils = require('../../util/utils');

const MsgSwapOrder = Root.irisnet.tx.MsgSwapOrder;
MsgSwapOrder.prototype.type = Config.iris.tx.swapOrder.prefix;
MsgSwapOrder.prototype.GetSignBytes = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr, this.input.address);
    let receiver = BECH32.encode(Config.iris.bech32.accAddr, this.output.address);
    let msg = {
        input: {
            address: sender,
            coin: this.input.coin
        },
        output: {
            address: receiver,
            coin: this.output.coin
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
MsgSwapOrder.prototype.GetMsg = function () {
    return this
};
MsgSwapOrder.prototype.GetDisplayContent = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr, this.input.address);
    let receiver = BECH32.encode(Config.iris.bech32.accAddr, this.output.address);
    return {
        i18n_tx_type: "i18n_swap_order",
        i18n_input: {
            address: sender,
            coin: this.input.coin
        },
        i18n_output: {
            address: receiver,
            coin: this.output.coin
        },
        i18n_deadline: this.deadline,
        i18n_is_buy_order: this.isBuyOrder
    }
};
MsgSwapOrder.prototype.toJSON = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr, this.input.address);
    let receiver = BECH32.encode(Config.iris.bech32.accAddr, this.output.address);

    return {
        input: {
            address: sender,
            coin: this.input.coin
        },
        output: {
            address: receiver,
            coin: this.output.coin
        },
        deadline: this.deadline,
        is_buy_order: this.isBuyOrder
    }
};

const MsgAddLiquidity = Root.irisnet.tx.MsgAddLiquidity;
MsgAddLiquidity.prototype.type = Config.iris.tx.addLiquidity.prefix;
MsgAddLiquidity.prototype.GetSignBytes = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr, this.sender);
    let msg = {
        max_token: this.maxToken,
        exact_iris_amt: this.exactIrisAmt,
        min_liquidity: this.minLiquidity,
        deadline: this.deadline,
        sender: sender
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};
MsgAddLiquidity.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.maxToken)) {
        throw new Error("maxToken is  empty");
    }
    if (Utils.isEmpty(this.exactIrisAmt)) {
        throw new Error("exactIrisAmt is  empty");
    }
    if (Utils.isEmpty(this.minLiquidity)) {
        throw new Error("minLiquidity is  empty");
    }
    if (Utils.isEmpty(this.deadline)) {
        throw new Error("deadline is  empty");
    }
    if (Utils.isEmpty(this.sender)) {
        throw new Error("sender is  empty");
    }
};
MsgAddLiquidity.prototype.GetMsg = function () {
    return this
};
MsgAddLiquidity.prototype.GetDisplayContent = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr, this.sender);
    return {
        i18n_tx_type: "i18n_add_liquidity",
        i18n_max_token: this.maxToken,
        i18n_exact_iris_amt: this.exactIrisAmt,
        i18n_deadline: this.deadline,
        i18n_min_liquidity: this.minLiquidity,
        i18n_sender: sender
    }
};
MsgAddLiquidity.prototype.toJSON = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr, this.sender);
    return {
        max_token: this.maxToken,
        exact_iris_amt: this.exactIrisAmt,
        min_liquidity: this.minLiquidity,
        deadline: this.deadline,
        sender: sender
    }
};

const MsgRemoveLiquidity = Root.irisnet.tx.MsgRemoveLiquidity;
MsgRemoveLiquidity.prototype.type = Config.iris.tx.removeLiquidity.prefix;
MsgRemoveLiquidity.prototype.GetSignBytes = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr, this.sender);
    let msg = {
        min_token: this.minToken,
        withdraw_liquidity: this.withdrawLiquidity,
        min_iris_amt: this.minIrisAmt,
        deadline: this.deadline,
        sender: sender
    };
    let sortMsg = Utils.sortObjectKeys(msg);
    return Amino.MarshalJSON(this.type, sortMsg)
};
MsgRemoveLiquidity.prototype.ValidateBasic = function () {
    if (Utils.isEmpty(this.minToken)) {
        throw new Error("minToken is  empty");
    }
    if (Utils.isEmpty(this.withdrawLiquidity)) {
        throw new Error("withdrawLiquidity is  empty");
    }
    if (Utils.isEmpty(this.minIrisAmt)) {
        throw new Error("minIrisAmt is  empty");
    }
    if (Utils.isEmpty(this.deadline)) {
        throw new Error("deadline is  empty");
    }
    if (Utils.isEmpty(this.sender)) {
        throw new Error("sender is  empty");
    }
};
MsgRemoveLiquidity.prototype.GetMsg = function () {
    return this
};
MsgRemoveLiquidity.prototype.GetDisplayContent = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr, this.sender);
    return {
        i18n_tx_type: "i18n_remove_liquidity",
        i18n_min_token: this.minToken,
        i18n_withdraw_liquidity: this.withdrawLiquidity,
        i18n_min_iris_amt: this.minIrisAmt,
        i18n_deadline: this.deadline,
        i18n_sender: sender
    }
};
MsgRemoveLiquidity.prototype.toJSON = function () {
    let sender = BECH32.encode(Config.iris.bech32.accAddr, this.sender);
    return {
        min_token: this.minToken,
        withdraw_liquidity: this.withdrawLiquidity,
        min_iris_amt: this.minIrisAmt,
        deadline: this.deadline,
        sender: sender
    }
};

module.exports = class Stake {
    static createMsgAddLiquidity(req) {
        let maxToken = {
            denom: req.msg.max_token.denom,
            amount: Utils.toString(req.msg.max_token.amount),
        };
        let exactIrisAmt = Utils.toString(req.msg.exact_iris_amt);
        let minLiquidity = Utils.toString(req.msg.min_liquidity);
        return new MsgAddLiquidity({
            maxToken: maxToken,
            exactIrisAmt: exactIrisAmt,
            minLiquidity: minLiquidity,
            deadline: req.msg.deadline,
            sender: BECH32.decode(req.from).words
        })
    }

    static createMsgRemoveLiquidity(req) {
        let withdrawLiquidity = {
            denom: req.msg.withdraw_liquidity.denom,
            amount: Utils.toString(req.msg.withdraw_liquidity.amount),
        };
        let minIrisAmt = Utils.toString(req.msg.min_iris_amt);
        let minToken = Utils.toString(req.msg.min_token);
        return new MsgRemoveLiquidity({
            minToken: minToken,
            withdrawLiquidity: withdrawLiquidity,
            minIrisAmt: minIrisAmt,
            deadline: req.msg.deadline,
            sender: BECH32.decode(req.from).words
        })
    }

    static createMsgSwapOrder(req) {
        let sender = BECH32.decode(req.msg.input.address).words;
        let receiver = BECH32.decode(req.msg.output.address).words;

        let input = {
            address: sender,
            coin: {
                denom: req.msg.input.coin.denom,
                amount: Utils.toString(req.msg.input.coin.amount),
            },
        };
        let output = {
            address: receiver,
            coin: {
                denom: req.msg.output.coin.denom,
                amount: Utils.toString(req.msg.output.coin.amount),
            },
        };
        return new MsgSwapOrder({
            input: input,
            output: output,
            deadline: req.msg.deadline,
            isBuyOrder: req.msg.isBuyOrder,
        });
    }
};