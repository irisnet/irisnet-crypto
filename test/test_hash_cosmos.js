const Irisnet = require('../index');
const common = require('./common');
const chai = require('chai');
const assert = chai.assert;

const url ="http://192.168.150.31:31317/txs";
//const url ="http://127.0.0.1:1317/txs";

describe('cosmos hash', function () {

    let chain_id = "cosmos-dev";
    let chainName = "cosmos";
    let threshold = 10;

    it('test transfer hash', function () {
        let crypto = Irisnet.getCrypto(chainName);
        let account1 = crypto.create();
        let sequence = 1;
        for (let i = 1; i <= threshold; i++) {
            let account2 = crypto.create();
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: sequence,
                fees: {denom: "stake", amount: 1},
                gas: 10000,
                memo: common.randomWord(100),
                type: Irisnet.config.cosmos.tx.transfer.type,
                msg: {
                    to: account2.address,
                    coins: [
                        {
                            denom: "stake",
                            amount: Math.pow(10,i)
                        }
                    ]
                }
            };

            sequence++;
            common.verifyTx(url,tx,account1.privateKey,chainName,verify);
        }
    });

    it('test delegate hash', function () {
        let crypto = Irisnet.getCrypto(chainName);
        let account1 = crypto.create();
        let sequence = 1;
        for (let i = 1; i <= threshold; i++) {
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: sequence,
                fees: {denom: "stake", amount: 100000000000000000},
                gas: 200000,
                memo: common.randomWord(100),
                type: Irisnet.config.cosmos.tx.delegate.type,
                msg: {
                    validator_addr: "cosmosvaloper1qksw0e05eh652yy0zqd7f0e3q4082dxy9qxdx6",
                    amount: {
                        denom: "stake",
                        amount: Math.pow(10,i)
                    }
                }
            };
            common.verifyTx(url,tx,account1.privateKey,chainName,verify);
            sequence++;
        }
    });

    it('test undelegate hash', function () {
        let crypto = Irisnet.getCrypto(chainName);
        let account1 = crypto.create();
        let sequence = 1;
        for (let i = 1; i <= threshold; i++) {
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: 12,
                fees: {denom: "stake", amount: 100000000000000000},
                gas: 200000,
                memo: common.randomWord(100),
                type: Irisnet.config.cosmos.tx.undelegate.type,
                msg: {
                    validator_addr: "cosmosvaloper1s989l7454j9985p7sy59asy7jz7scqylf7rjpz",
                    amount: {
                        denom: "stake",
                        amount: "5"
                    }
                }
            };
            common.verifyTx(url,tx,account1.privateKey,chainName,verify);
            sequence++;
        }
    });

    it('test beginRedelegate hash', function () {
        let crypto = Irisnet.getCrypto(chainName);
        let account1 = crypto.create();
        let sequence = 1;
        for (let i = 1; i <= threshold; i++) {
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: 14,
                fees: {denom: "stake", amount: 100000000000000000},
                gas: 200000,
                memo: common.randomWord(100),
                type: Irisnet.config.cosmos.tx.beginRedelegate.type,
                msg: {
                    validator_src_addr: "cosmosvaloper1s989l7454j9985p7sy59asy7jz7scqylf7rjpz",
                    validator_dst_addr: "cosmosvaloper14xa765k7fz7qfmt2cf4s0ag0pl8vztuvar8qzl",
                    amount: {
                        denom: "stake",
                        amount: "2"
                    }
                }
            };
            common.verifyTx(url,tx,account1.privateKey,chainName,verify);
            sequence++;
        }
    });

    it('test setWithdrawAddress hash', function () {
        let crypto = Irisnet.getCrypto(chainName);
        let account1 = crypto.create();
        let sequence = 1;
        for (let i = 1; i <= threshold; i++) {
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: 15,
                fees: {denom: "stake", amount: 100000000000000000},
                gas: 200000,
                memo: "1",
                type: Irisnet.config.cosmos.tx.setWithdrawAddress.type,
                msg: {
                    withdraw_addr: "cosmos192xdyxer5hvtrrredragyup2gejv73ztzpa7j3",
                }
            };
            common.verifyTx(url,tx,account1.privateKey,chainName,verify);
            sequence++;
        }
    });

    it('test withdrawValidatorCommission hash', function () {
        let crypto = Irisnet.getCrypto(chainName);
        let account1 = crypto.create();
        let sequence = 1;
        for (let i = 1; i <= threshold; i++) {
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: 6,
                fees: {denom: "stake", amount: 100000000000000000},
                gas: 200000,
                memo: common.randomWord(100),
                type: Irisnet.config.cosmos.tx.withdrawValidatorCommission.type,
                msg: {
                    validator_addr: "cosmosvaloper1qksw0e05eh652yy0zqd7f0e3q4082dxy9qxdx6",
                }
            };
            common.verifyTx(url,tx,account1.privateKey,chainName,verify);
            sequence++;
        }
    });
});

function verify(act,exp,data) {
    assert.strictEqual(act.txhash,exp.hash,JSON.stringify(data));
}
