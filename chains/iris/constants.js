//交易类型枚举类型
class TxType {}
TxType.TRANSFER                     = "transfer";
TxType.DELEGATE                     = "delegate";
TxType.BEGINUNBOND                  = "beginUnbond";
TxType.COMPLETEUNBOND               = "completeUnbond";

class IrisNetConfig{}
IrisNetConfig.MAXGAS                = 20000000;
IrisNetConfig.PREFIX_BECH32_ACCADDR = "cosmosaccaddr";
IrisNetConfig.PREFIX_BECH32_VALADDR = "cosmosvaladdr";
IrisNetConfig.ENCODING_BECH32       = "bech32";
IrisNetConfig.ENCODING_HEX          = "hex";

class AminoKey {}
AminoKey.BIP44Prefix                = "44'/118'/";
AminoKey.FullFundraiserPath         = AminoKey.BIP44Prefix + "0'/0/0";
AminoKey.SignatureSecp256k1_prefix  = "tendermint/SignatureSecp256k1";
AminoKey.PubKeySecp256k1_prefix     = "tendermint/PubKeySecp256k1";

module.exports = {TxType,IrisNetConfig,AminoKey};