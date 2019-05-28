const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;
const common = require('./common');


describe('account', function () {

    describe('iris', function () {
        let url ="http://irisnet-lcd.dev.rainbow.one/keys/%s/recover";
        let chainName = Irisnet.config.chain.iris;
        it('test create and recover', function () {
            //let str = "";
            for (let i = 0; i < 10; i++) {
                let crypto = Irisnet.getCrypto(chainName, 'testnet');
                let keyPair = crypto.create(Irisnet.config.language.en);
                let keyPair2 = crypto.recover(keyPair.phrase, Irisnet.config.language.en);
                assert.deepEqual(keyPair, keyPair2);
                //str += (JSON.stringify(keyPair) + "\n");
                let path = url.replace("%s",common.randomWord(10));
                common.verifyAccount(path,keyPair)
            }
            // let fs = require("fs");
            // fs.writeFileSync('./input.txt',str);
            // fs.close()
        });

        it('test import', function () {
            let crypto = Irisnet.getCrypto(chainName, 'testnet');
            let srcAccount = crypto.create(Irisnet.config.language.en);
            let dstaccount = crypto.import(srcAccount.privateKey);
            assert.equal(srcAccount.address, dstaccount.address);
            assert.equal(srcAccount.privateKey, dstaccount.privateKey);
            assert.equal(srcAccount.publicKey, dstaccount.publicKey);
            let path = url.replace("%s",common.randomWord(10));
            common.verifyAccount(path,srcAccount)
        });

        it('should exportKeystore', function () {
            let privateKey = "465820F3AC6B406F8D599E558ACC48A135C57A2537CB96EF544A3D66449E7D63";
            let crypto = Irisnet.getCrypto(chainName, 'testnet');
            let keystore = crypto.exportKeystore(privateKey,"1234567890");
            console.log(JSON.stringify(keystore))
        });

        it('should importKeystore', function () {
            let keystore = {"version":1,"address":"faa1aake3umjllpd9es5d3qmry4egcne0f8a8u5rsx","crypto":{"ciphertext":"8e20b34598eb9d9408c27273b11de9b6b3c7bbf4bfad27ede53f4f38f25853d6","cipherparams":{"iv":"bea930a9098d9da8505c68e3808fa01e"},"cipher":"aes-256-ctr","kdf":"pbkdf2","kdfparams":{"dklen":32,"salt":"073c5f7eb7ea81c093f805fd89f3043ac3218b2d808940c2f9e5e6432f71e12c","c":262144,"prf":"hmac-sha256"},"mac":"4bf270d38b00b645eed2a59813465ed8628070fdcfeb64dac3165f1f31b13f70"}};
            let privateKey = "465820F3AC6B406F8D599E558ACC48A135C57A2537CB96EF544A3D66449E7D63";
            let crypto = Irisnet.getCrypto(chainName, 'testnet');
            let acc = crypto.importKeystore(keystore,"1234567890");
            assert.deepEqual(privateKey, acc.privateKey);
            assert.deepEqual(keystore.address, acc.address);
        });
        it('should exportKeystore and importKeystore', function () {
            let crypto = Irisnet.getCrypto(chainName, 'testnet');
            for (let i = 0;i <2;i++){
                let privateKey = common.randomHex(64);
                let password = common.randomWord(10);
                let keystore = crypto.exportKeystore(privateKey,password);
                let acc = crypto.importKeystore(keystore,password);
                assert.deepEqual(privateKey, acc.privateKey);
            }
        });
    });

    describe('cosmos', function () {
        let chainName = Irisnet.config.chain.cosmos;
        it('test create and recover', function () {
            let str = "";
            for (let i = 0; i < 100; i++) {
                let crypto = Irisnet.getCrypto(chainName);
                let keyPair = crypto.create(Irisnet.config.language.en);
                let keyPair2 = crypto.recover(keyPair.phrase, Irisnet.config.language.en);
                assert.deepEqual(keyPair, keyPair2);
                str += (JSON.stringify(keyPair) + "\n")
            }
            // let fs = require("fs");
            // fs.writeFileSync('./input.txt',str);
            // fs.close()
        });

        it('test import', function () {
            let crypto = Irisnet.getCrypto(chainName);
            let srcAccount = crypto.create(Irisnet.config.language.en);
            let dstaccount = crypto.import(srcAccount.privateKey);
            assert.equal(srcAccount.address, dstaccount.address);
            assert.equal(srcAccount.privateKey, dstaccount.privateKey);
            assert.equal(srcAccount.publicKey, dstaccount.publicKey);
        });
    });
});