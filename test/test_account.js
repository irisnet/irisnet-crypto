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