//交易类型枚举类型
class TxType {}
TxType.TRANSFER = "transfer";
TxType.DELEGATE = "delegate";
TxType.UNBOND = "unbond";

class IrisNetConfig{}
IrisNetConfig.MAXGAS = 3000000;
IrisNetConfig.PREFIX_BECH32_ACCADDR = "cosmosaccaddr";
IrisNetConfig.PREFIX_BECH32_VALADDR = "cosmosvaladdr";
IrisNetConfig.ENCODING_BECH32 = "bech32";
IrisNetConfig.ENCODING_HEX = "hex";

module.exports = {TxType,IrisNetConfig};