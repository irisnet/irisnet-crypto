const Holder = require("../keys/crypto/holder");
const chai = require('chai');
const bech32 = require('bech32');
const assert = chai.assert;
const Bank = require("../keys/cosmos/x/bank");
const Hex = require("../keys/hex");
Holder.Init(
    {
        "gaia": 'http://192.168.150.111:8999',
        "tendermint": "http://192.168.150.138:8080/tendermint",
        "ethermint": "http://192.168.150.125:8555",
        "iris": "http://localhost:1317"
    }
);

describe('holder test', function () {
    describe('Balance', function () {
        it('Balance', function () {
            let address = "1EC2E86065D5EF88A3ED65B8B3A43210FAD9C7B2"
            Holder.Balance("cosmos",address).then(result => {
                console.log("Acc:" + JSON.stringify(result));
            })
        });
    });

    describe('Validators', function () {
        it('Validators', function () {
            Holder.Validators("cosmos").then(result => {
                console.log(JSON.stringify(result));
            })
        });
    });

    describe('Transfer', function () {
        it('Transfer', function () {
            let account = Holder.Import("cosmos", "625f0968c78d95857629ea4b4cbafe2f3f949a92e82dda09b5fbe9fbc70d50cc62f3621a751f0431b69b965d41ec480f1b9a4b6f14a1f6c0d17158281a980f74");
            let amts = [new Bank.Coin(10, "iris")];
            let fee = [new Bank.Coin(0, "iris")];
            let gas = 200000;

            if (account) {
                let tx = {
                    "fromAcc" : account,
                    "to" :"3A058A8B5468AE0EA2D2517CE3BAFDD281E50C2F",
                    "amts" :amts,
                    "fees" :fee,
                    "gas"  :gas
                }
                Holder.Transfer("cosmos",tx).then(result => {
                    console.log("hash:" + result.hash);
                } )
            }

        });
    });

    describe('Delegate', function () {
        it('Delegate', function () {
            let account = Holder.Import("cosmos", "93af640b13a89d643a5c5715a9347ab4a3272ef23ed97854b91b9619c8319df1049605b7d0014bc14d5630e34f688fda8b14d46bc8e917887d1bab28bbf475d8");
            let amts = new Bank.Coin(10, "steak");
            let fee = [new Bank.Coin(0, "iris")];
            let gas = 200000;

            if (account) {
                let tx = {
                    "fromAcc" : account,
                    "to" :"1EC2E86065D5EF88A3ED65B8B3A43210FAD9C7B2",
                    "amts" :amts,
                    "fees" :fee,
                    "gas"  :gas
                }
                Holder.Delegate("cosmos",tx).then(result => {
                    console.log("hash:" + result.hash);
                } )
            }

        });
    });

    describe('Unbond', function () {
        it('Unbond', function () {
            let account = Holder.Import("cosmos", "93af640b13a89d643a5c5715a9347ab4a3272ef23ed97854b91b9619c8319df1049605b7d0014bc14d5630e34f688fda8b14d46bc8e917887d1bab28bbf475d8");
            // TODO
            let shares = "1";
            let fee = [new Bank.Coin(0, "iris")];
            let gas = 200000;

            if (account) {
                let tx = {
                    "fromAcc" : account,
                    "to" :"1EC2E86065D5EF88A3ED65B8B3A43210FAD9C7B2",
                    "amts" :shares,
                    "fees" :fee,
                    "gas"  :gas
                }
                Holder.Unbond("cosmos",tx).then(result => {
                    console.log("hash:" + result.hash);
                } )
            }

        });
    });

    describe('account create and recover', function () {
        it('cosmos create and recover', function () {
            let account = Holder.Create("cosmos", "ed25519", "english");
            if (account) {
                let recoverAccount = Holder.Recover("cosmos", account.phrase, "english");
                assert.deepEqual(account, recoverAccount);
            }
        });
    });
    describe('account import', function () {
        it('cosmos import', function () {
            let account = Holder.Import("cosmos", "d7d0e94910acf14db687721d6843193be16fa418a743c52be08c0fdd0314b382339c3f5c26ba236a24e31a8cc37a6cbc69ecdcebe1d40903437dcc819b9140c0");
            assert.deepEqual(account, {
                    address: 'E3FF72F43F8B5F5E71C874F6F2B517FA6E21DE67',
                    privateKey: 'd7d0e94910acf14db687721d6843193be16fa418a743c52be08c0fdd0314b382339c3f5c26ba236a24e31a8cc37a6cbc69ecdcebe1d40903437dcc819b9140c0',
                    publicKey: '339c3f5c26ba236a24e31a8cc37a6cbc69ecdcebe1d40903437dcc819b9140c0'
                }
            );
        });
        it('ethermint import', function () {
            let account = Holder.Import("ethermint", "766825d2b29f8702cac708e0ba01bf0565e0b7a438cdd657ca64953d02b64ff4");
            assert.deepEqual(account, {
                    address: '0x725820bf168de43bad96c4de25a41e2406dfe9a5',
                    privateKey: '766825d2b29f8702cac708e0ba01bf0565e0b7a438cdd657ca64953d02b64ff4',
                    publicKey: 'c9336709e19c09bba6f9028093ed173907f7a44169320d04e3d5b0a43c6c948bdcf6388481aad35b1ce6d8cbd19c5a934513ca8341cc39c4c7adca5d159e5cab'
                }
            );
        });
    });
    describe('account address isValid', function () {
        it('cosmos address isValid true', function () {
            let isValid = Holder.IsValidAddress("cosmos", "725820bf168de43bad96c4de25a41e2406dfe9a5");
            assert.deepEqual(isValid, true);
        });
        it('cosmos address isValid false', function () {
            let isValid = Holder.IsValidAddress("cosmos", "0x725820bf168de43bad96c4de25a41e2406dfe9a5");
            assert.deepEqual(isValid, false);
        });
        it('ethermint address isValid true', function () {
            let isValid = Holder.IsValidAddress("ethermint", "0x725820bf168de43bad96c4de25a41e2406dfe9a5");
            assert.deepEqual(isValid, true);
        });
        it('ethermint address isValid false', function () {
            let isValid = Holder.IsValidAddress("ethermint", "725820bf168de43bad96c4de25a41e2406dfe9a5");
            assert.deepEqual(isValid, false);
        });
    });
    describe('account private key isValid', function () {
        it('cosmos private key isValid true', function () {
            let isValid = Holder.IsValidPrivate("cosmos", "d7d0e94910acf14db687721d6843193be16fa418a743c52be08c0fdd0314b382339c3f5c26ba236a24e31a8cc37a6cbc69ecdcebe1d40903437dcc819b9140c0");
            assert.deepEqual(isValid, true);
        });
        it('cosmos private key isValid false', function () {
            let isValid = Holder.IsValidPrivate("cosmos", "1d7d0e94910acf14db687721d6843193be16fa418a743c52be08c0fdd0314b382339c3f5c26ba236a24e31a8cc37a6cbc69ecdcebe1d40903437dcc819b9140c0");
            assert.deepEqual(isValid, false);
        });
        it('ethermint private key isValid true', function () {
            let isValid = Holder.IsValidPrivate("ethermint", "766825d2b29f8702cac708e0ba01bf0565e0b7a438cdd657ca64953d02b64ff4");
            assert.deepEqual(isValid, true);
        });
        it('ethermint private key isValid false', function () {
            let isValid = Holder.IsValidPrivate("ethermint", "1766825d2b29f8702cac708e0ba01bf0565e0b7a438cdd657ca64953d02b64ff4");
            assert.deepEqual(isValid, false);
        });
    });
    describe('bech32 is Valid', function () {
        it('bech32 encode', function () {
            let addrByte = bech32.toWords(Buffer.from("1EC2E86065D5EF88A3ED65B8B3A43210FAD9C7B2", 'hex'))
            let bech32Acc = bech32.encode("cosmosaccaddr",addrByte)
            assert.deepEqual(bech32Acc, "cosmosaccaddr1rmpwscr96hhc3gldvkut8fpjzradn3ajvrmlgd");
        });
        it('bech32 decode', function () {
            let bech32Str = "cosmosaccaddr1rmpwscr96hhc3gldvkut8fpjzradn3ajvrmlgd"
            let key = bech32.decode(bech32Str)
            console.log(Hex.bytesToHex(bech32.fromWords(key.words)))
        });
        it('Recover', function () {
            let account = Holder.Recover("cosmos", "wolf fat basic another cloth crucial bargain addict illness another plate erase garlic truck artist abandon", "english");
            console.log(account)
        });
    });
});




