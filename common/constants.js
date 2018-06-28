'use strict';

//链Id枚举类型
class Chains {}

Chains.IRIS = "iris";
Chains.ETHERMINT = "ethermint";

//交易类型枚举类型
class TxType {}
TxType.TRANSFER = "transfer";
TxType.DELEGATE = "delegate";
TxType.UNBOND = "unbond";

module.exports = {Chains,TxType}