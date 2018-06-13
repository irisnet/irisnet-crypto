const Holder = require("../keys/crypto/holder");
const chai = require('chai');
const assert = chai.assert;
Holder.Init(
    {
        "gaia": 'http://192.168.150.111:8999',
        "tendermint": "http://192.168.150.138:8080/tendermint",
        "ethermint": "http://192.168.150.125:8555"
    }
);

describe('holder test', function () {
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
});




