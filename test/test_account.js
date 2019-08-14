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

        it('should recover', function () {
            let crypto = Irisnet.getCrypto(chainName, 'testnet');
            let seed = "tube lonely pause spring gym veteran know want grid tired taxi such same mesh charge orient bracket ozone concert once good quick dry boss";
            let keyPair2 = crypto.recover(seed, Irisnet.config.language.en);
            console.log(JSON.stringify(keyPair2))
        });

        describe('keystore', function () {
            it('exportKeystore', function () {
                let privateKey = "55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175";
                let crypto = Irisnet.getCrypto(chainName, 'testnet');
                let keystore = crypto.exportKeystore(privateKey,"1234567890");
            });

            it('importKeystore', function () {
                let keystore = require("./keystore.json");
                let privateKey = "55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175";
                let crypto = Irisnet.getCrypto(chainName, 'testnet');
                let acc = crypto.importKeystore(keystore,"1234567890");
                assert.deepEqual(privateKey, acc.privateKey);
                assert.deepEqual(keystore.address, acc.address);
            });
            it('exportKeystore and importKeystore', function () {
                let crypto = Irisnet.getCrypto(chainName, 'testnet');
                let privateKey = common.randomHex(64);
                let password = common.randomWord(10);
                let keystore = crypto.exportKeystore(privateKey,password);
                let acc = crypto.importKeystore(keystore,password);
                assert.deepEqual(privateKey, acc.privateKey);
            });
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