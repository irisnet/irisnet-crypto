//交易类型枚举类型
class TxType {}
TxType.TRANSFER                         = "transfer";
TxType.DELEGATE                         = "delegate";
TxType.BEGINUNBOND                      = "beginUnbond";
TxType.BEGINREdELEGATE                  = "beginRedelegate";
TxType.SET_WITHDRAW_ADDRESS             = "set_withdraw_address";
TxType.WITHDRAW_DELEGATION_REWARD_ALL   = "withdraw_delegation_rewards_all";
TxType.WITHDRAW_DELEGATION_REWARD       = "withdraw_delegation_reward";

class IrisNetConfig{}
IrisNetConfig.MAXGAS                = 20000000;
IrisNetConfig.PREFIX_BECH32_ACCADDR = "faa";
IrisNetConfig.PREFIX_BECH32_VALADDR = "fva";
IrisNetConfig.PREFIX_BECH32_ACCPUB  = "fap";
IrisNetConfig.ENCODING_BECH32       = "bech32";
IrisNetConfig.ENCODING_HEX          = "hex";
IrisNetConfig.DEFAULT_ENCODING      = IrisNetConfig.ENCODING_BECH32;

class AminoKey {}
AminoKey.BIP44Prefix                = "44'/118'/";
AminoKey.FullFundraiserPath         = AminoKey.BIP44Prefix + "0'/0/0";
AminoKey.SignatureSecp256k1_prefix  = "tendermint/SignatureSecp256k1";
AminoKey.PubKeySecp256k1_prefix     = "tendermint/PubKeySecp256k1";

module.exports = {TxType,IrisNetConfig,AminoKey};