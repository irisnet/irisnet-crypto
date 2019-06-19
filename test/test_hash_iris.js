const Irisnet = require('../index');
const common = require('./common');
const chai = require('chai');
const assert = chai.assert;


const url ="http://irisnet-lcd.dev.rainbow.one/tx/broadcast";
const chainName ="iris";
const threshold = 10;
const chain_id = "rainbow-dev";

describe('iris hash', function () {

    it('test transfer hash', function () {
        let crypto = Irisnet.getCrypto('iris', 'testnet');
        let account1 = crypto.create();
        let sequence = 1;
        let base = 1000000000000000000;
        for (let i = 1; i <= threshold; i++) {
            let account2 = crypto.create();
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: sequence,
                fees: {denom: "iris-atto", amount: 100000000000000000},
                gas: 10000,
                memo: common.randomWord(100),
                type: Irisnet.config.iris.tx.transfer.type,
                msg: {
                    to: account2.address,
                    coins: [
                        {
                            denom: "iris-atto",
                            amount: base * Math.pow(10,i)
                        }
                    ]
                }
            };
            common.verifyTx(url,tx,account1.privateKey,chainName,verify);
            sequence++;
        }
    });

    it('test delegate hash', function () {
        let crypto = Irisnet.getCrypto('iris', 'testnet');
        let account1 = crypto.create();
        let sequence = 1;
        for (let i = 1; i <= threshold; i++) {
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: sequence,
                fees: {denom: "iris-atto", amount: 100000000000000000},
                gas: 10000,
                memo: common.randomWord(100),
                type: Irisnet.config.iris.tx.delegate.type,
                msg: {
                    validator_addr: "fva1aake3umjllpd9es5d3qmry4egcne0f8ajd7vdp",
                    delegation: {
                        denom: "iris-atto",
                        amount: 1000000000000000000000000
                    }
                }
            };
            common.verifyTx(url,tx,account1.privateKey,chainName,verify);
            sequence++;
        }
    });
});


function verify(act,exp,data) {
    assert.strictEqual(act.hash,exp.hash,JSON.stringify(data))
}

