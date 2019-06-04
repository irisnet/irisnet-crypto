const Irisnet = require('../index');
const common = require('./common');
const chai = require('chai');
const assert = chai.assert;

const host ="http://192.168.150.31:31317";
const url = host + "/txs";
//const lcdServer ="http://127.0.0.1:1317/txs";

describe('cosmos transaction', function () {
    let chain_id = "cosmos-dev";
    let from = "cosmos192xdyxer5hvtrrredragyup2gejv73ztzpa7j3";
    let gas = 200000;
    let account_number = 4;
    let fees = {denom: "stake", amount: "2"};
    let privateKey = "4F13455BE209B262E8F28D610B8396F8BB0C8318154C1719EF055BDA44EA9EFF";

    let chainName = "cosmos";

    it('test  transfer', function () {
        let seq = common.getSequence(host,from);
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: seq,
            fees: fees,
            gas: gas,
            memo:common.randomWord(100) ,
            type: Irisnet.config.cosmos.tx.transfer.type,
            return_type: 'sync',
            msg: {
                to: "cosmos1cx7ny2znzdegzj27mq2lqavk8dcvc0uysmyzg7",
                coins: [
                    {
                        denom: "atom",
                        amount: "10"
                    }
                ]
            }
        };

        common.verifyTx(url,tx,privateKey,chainName,verify);
    });

    it('test delegate', function () {
        let seq = common.getSequence(host,from);
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: seq,
            fees: fees,
            gas: gas,
            memo: common.randomWord(100),
            type: Irisnet.config.cosmos.tx.delegate.type,
            msg: {
                validator_addr: "cosmosvaloper1s989l7454j9985p7sy59asy7jz7scqylf7rjpz",
                amount: {
                    denom: "stake",
                    amount: "10"
                }
            }
        };

        common.verifyTx(url,tx,privateKey,chainName,verify);
    });

    it('test undelegate', function () {
        let seq = common.getSequence(host,from);
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: seq,
            fees: fees,
            gas: gas,
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

        common.verifyTx(url,tx,privateKey,chainName,verify);
    });

    it('test beginRedelegate', function () {
        let seq = common.getSequence(host,from);
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: seq,
            fees: fees,
            gas: gas,
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

        common.verifyTx(url,tx,privateKey,chainName,verify);
    });

    it('test MsgSetWithdrawAddress', function () {
        let seq = common.getSequence(host,from);
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: seq,
            fees: fees,
            gas: gas,
            memo: common.randomWord(100),
            type: Irisnet.config.cosmos.tx.setWithdrawAddress.type,
            msg: {
                withdraw_addr: "cosmos192xdyxer5hvtrrredragyup2gejv73ztzpa7j3",
            }
        };

        common.verifyTx(url,tx,privateKey,chainName,verify);
    });
    it('test MsgWithdrawDelegatorReward', function () {
        let seq = common.getSequence(host,from);
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: seq,
            fees: fees,
            gas: gas,
            memo: common.randomWord(100),
            type: Irisnet.config.cosmos.tx.withdrawDelegatorReward.type,
            msg: {
                validator_addr: "cosmos192xdyxer5hvtrrredragyup2gejv73ztzpa7j3",
            }
        };

        common.verifyTx(url,tx,privateKey,chainName,verify);
    });

    //TODO Pending verification
    // it('test MsgWithdrawValidatorCommission', function () {
    //     let seq = common.getSequence(host,from);
    //     let tx = {
    //         chain_id: chain_id,
    //         from: from,
    //         account_number: account_number,
    //         sequence: seq,
    //         fees: fees,
    //         gas: gas,
    //         memo: common.randomWord(100),
    //         type: Irisnet.config.cosmos.tx.withdrawValidatorCommission.type,
    //         msg: {
    //             validator_addr: "cosmosvaloper1qksw0e05eh652yy0zqd7f0e3q4082dxy9qxdx6",
    //         }
    //     };
    //
    //     common.verifyTx(url,tx,privateKey,chainName,verify);
    // });
});

function verify(act,exp,data) {
    assert.notExists(act.code,`tx commit failed,${act.raw_log}`);
}
