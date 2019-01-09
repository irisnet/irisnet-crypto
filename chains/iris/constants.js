
let conf = require("./conf")
//交易类型枚举类型
class TxType {}
TxType.TRANSFER                     = "transfer";
TxType.DELEGATE                     = "delegate";
TxType.BEGINUNBONDING                  = "beginUnbonding";
TxType.BEGINREdELEGATE              = "beginRedelegate";

class IrisNetConfig{}
IrisNetConfig.MAXGAS                = 20000000;
IrisNetConfig.PREFIX_BECH32_ACCADDR = conf.accAddr;
IrisNetConfig.PREFIX_BECH32_VALADDR = conf.valAddr;
IrisNetConfig.PREFIX_BECH32_ACCPUB  = conf.accPub;
IrisNetConfig.ENCODING_BECH32       = "bech32";
IrisNetConfig.ENCODING_HEX          = "hex";
IrisNetConfig.DEFAULT_ENCODING      = IrisNetConfig.ENCODING_BECH32;

class AminoKey {}
AminoKey.BIP44Prefix                = "44'/118'/";
AminoKey.FullFundraiserPath         = AminoKey.BIP44Prefix + "0'/0/0";
AminoKey.SignatureSecp256k1_prefix  = "tendermint/SignatureSecp256k1";
AminoKey.PubKeySecp256k1_prefix     = "tendermint/PubKeySecp256k1";

module.exports = {TxType,IrisNetConfig,AminoKey};