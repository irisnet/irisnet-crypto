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

//字符集
class Language {}
Language.CH_S = "chinese_simplified";
Language.JP = "japanese";
Language.SP = "spanish";
Language.EN = "english";

class IrisNetConfig{}
IrisNetConfig.MAXGAS = 10000;
IrisNetConfig.PREFIX_BECH32_ACCADDR = "cosmosaccaddr";
IrisNetConfig.PREFIX_BECH32_VALADDR = "cosmosvaladdr";
IrisNetConfig.ENCODING_BECH32 = "bech32";
IrisNetConfig.ENCODING_HEX = "hex";

module.exports = {Chains,TxType,Language,IrisNetConfig};