const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;
const config = require('../config');



describe('CryPto test', function () {

    //测试账户相关信息
    describe('test account', function () {
        it('test create and recover', function () {
            let crypto = Irisnet.getCrypto(config.chain.iris);
            let keyPair = crypto.create(config.language.en);
            console.log(JSON.stringify(keyPair));
            let keyPair2 = crypto.recover(keyPair.phrase,config.language.en);
            assert.deepEqual(keyPair, keyPair2);
        });

        it('test import', function () {
            let crypto = Irisnet.getCrypto(config.chain.iris);
            let account = crypto.import("55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175")
            assert.deepEqual(account, {
                    address: 'faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm',
                    phrase: null,
                    privateKey: '55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175',
                    publicKey: 'fap1addwnpepqtdme789cpm8zww058ndlhzpwst3s0mxnhdhu5uyps0wjucaufha6v3ce99'
                }
            );
        });

        it('test recover', function () {
            let crypto = Irisnet.getCrypto(config.chain.iris);
            let account = crypto.recover("tube lonely pause spring gym veteran know want grid tired taxi such same mesh charge orient bracket ozone concert once good quick dry boss");
            console.log(account)
        });
    });


    let chain_id = "rainbow-dev";
    let from = "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm";
    let gas = 200000;
    let account_number = 4;
    let fees = {denom: "iris-atto",amount:400000000000000000};
    let memo = "1";
    let privateKey = "55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175";
    let chain = config.chain.iris;


    //测试热钱包相关交易
    describe('test wallet tx', function () {
        it('test transfer', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:720 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.transfer.type,
                msg: {
                    to: "faa1s6v9qgu8ye7d884s8kpye64x66znndg8t6eztj",
                    coins: [
                        {
                            denom: "iris-atto",
                            amount:10000000000000000000
                        }
                    ]
                }
            };

            execute(tx);
        });

        it('test delegate', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:721 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.delegate.type,
                msg: {
                    validator_addr: "fva16h3uazd2wknrae7ql0dqpjw69s5kp44slme6hr",
                    delegation: {
                        denom: "iris-atto",
                        amount:10000000000000000000
                    }
                }
            };

            execute(tx);
        });

        it('test BeginUnbonding', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:723 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.unbond.type,
                msg: {
                    validator_addr: "fva16h3uazd2wknrae7ql0dqpjw69s5kp44slme6hr",
                    shares_amount:"10000000000000000000"
                }
            };

            execute(tx);
        });

        it('test BeginRedelegate', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:722 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.redelegate.type,
                msg: {
                    validator_src_addr: "fva1cr6xfpp078nm7yfsh36850ftu20fl3c9duchrk",
                    validator_dst_addr: "fva1xde0yh9vmc8mnkdvdr5krllfe3gslw9d4qp2wd",
                    shares_amount:10000000000000000000
                }
            };

            execute(tx);
        });

        //TODO
        it('test MsgSetWithdrawAddress', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:710 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.setWithdrawAddress.type,
                msg: {
                    withdraw_addr: "faa1cr6xfpp078nm7yfsh36850ftu20fl3c9cdjc73",
                }
            };

            execute(tx);
        });

        it('test MsgWithdrawDelegatorRewardsAll', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:724 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.withdrawDelegationRewardsAll.type,
            };

            execute(tx);
        });

        it('test MsgWithdrawDelegatorReward', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:725 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.withdrawDelegationReward.type,
                msg: {
                    validator_addr: "fva1xde0yh9vmc8mnkdvdr5krllfe3gslw9d4qp2wd",
                }
            };

            execute(tx);
        });
    });

    //测试冷钱包相关交易
    describe('test ledger wallet tx ', function () {
        it('test transfer', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:731 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.transfer.type,
                msg: {
                    to: "faa1s6v9qgu8ye7d884s8kpye64x66znndg8t6eztj",
                    coins: [
                        {
                            denom: "iris-atto",
                            amount:10000000000000000000
                        }
                    ]
                }
            };

            extracted(tx);
        });


        it('test delegate', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:727 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.delegate.type,
                msg: {
                    validator_addr: "fva16h3uazd2wknrae7ql0dqpjw69s5kp44slme6hr",
                    delegation: {
                        denom: "iris-atto",
                        amount:10000000000000000000
                    }
                }
            };

            extracted(tx);
        });

        it('test BeginUnbonding', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:728 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.unbond.type,
                msg: {
                    validator_addr: "fva16h3uazd2wknrae7ql0dqpjw69s5kp44slme6hr",
                    shares_amount:"10000000000000000000"
                }
            };

            extracted(tx);
        });

        it('test BeginRedelegate', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:20 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.redelegate.type,
                msg: {
                    validator_src_addr: "fva1cr6xfpp078nm7yfsh36850ftu20fl3c9duchrk",
                    validator_dst_addr: "fva1xde0yh9vmc8mnkdvdr5krllfe3gslw9d4qp2wd",
                    shares_amount:10000000000000000000
                }
            };

            extracted(tx);
        });

        it('test MsgSetWithdrawAddress', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:696 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.setWithdrawAddress.type,
                msg: {
                    withdraw_addr: "faa1cr6xfpp078nm7yfsh36850ftu20fl3c9cdjc73",
                }
            };

            extracted(tx);
        });

        it('test MsgWithdrawDelegatorRewardsAll', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:729 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.withdrawDelegationRewardsAll.type,
            };

            extracted(tx);
        });

        it('test MsgWithdrawDelegatorReward', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:730 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: config.iris.tx.withdrawDelegationReward.type,
                msg: {
                    validator_addr: "fva1xde0yh9vmc8mnkdvdr5krllfe3gslw9d4qp2wd",
                }
            };

            extracted(tx);
        });
    });

    //冷钱包调用
    function extracted(tx) {
        let builder = Irisnet.getBuilder(chain);
        let signMsg = builder.buildTx(tx);
        let signStr = JSON.stringify(signMsg);
        console.log("======热钱包传递给冷钱包签名的字符串======");
        console.log(signStr);
        console.log("======热钱包传递给冷钱包签名的字符串======");

        let stdTx = builder.signTx(signStr, privateKey);
        console.log("======待提交交易======");
        console.log(JSON.stringify(stdTx.GetPostData()));
        console.log("======待提交交易======");
        let result = stdTx.Hash();
        console.log("data:", result.data);
        console.log("hash", result.hash);
    }

    //热钱包调用
    function execute(tx) {
        let builder = Irisnet.getBuilder(chain);
        let stdTx = builder.buildAndSignTx(tx,privateKey);
        console.log("======待提交交易======");
        console.log(JSON.stringify(stdTx.GetPostData()));
        console.log("======待提交交易======");
        let result = stdTx.Hash();
        console.log("data:",result.data);
        console.log("hash",result.hash);
    }
});