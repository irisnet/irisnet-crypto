const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;



describe('CryPto test', function () {

    //测试账户相关信息
    describe('test account', function () {
        it('test create and recover', function () {
            let crypto = Irisnet.getCrypto(Irisnet.config.chain.iris);
            let keyPair = crypto.create(Irisnet.config.language.en);
            console.log(JSON.stringify(keyPair));
            let keyPair2 = crypto.recover(keyPair.phrase,Irisnet.config.language.en);
            assert.deepEqual(keyPair, keyPair2);
        });

        it('test import', function () {
            let crypto = Irisnet.getCrypto(Irisnet.config.chain.iris);
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
            let crypto = Irisnet.getCrypto(Irisnet.config.chain.iris);
            let account = crypto.recover("tube lonely pause spring gym veteran know want grid tired taxi such same mesh charge orient bracket ozone concert once good quick dry boss");
            console.log(account)
        });
    });


    let chain_id = "irishub-test";
    let from = "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm";
    let gas = 200000;
    let account_number = 4;
    let fees = {denom: "iris-atto",amount:400000000000000000};
    let memo = "1";
    let privateKey = "55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175";
    let chain = Irisnet.config.chain.iris;


    //测试热钱包相关交易
    describe('test wallet tx', function () {
        it('test transfer', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:0 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.transfer.type,
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
                sequence:1 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.delegate.type,
                msg: {
                    validator_addr: "fva1kca5vw7r2k72d5zy0demszmrhdz4dp8t4uat0c",
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
                sequence:23 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.unbond.type,
                msg: {
                    validator_addr: "fva1rz7jxmgsgyjwa6erusxlzrmg2aw3cvyf3c3x6v",
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
                sequence:22 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.redelegate.type,
                msg: {
                    validator_src_addr: "fva1kca5vw7r2k72d5zy0demszmrhdz4dp8t4uat0c",
                    validator_dst_addr: "fva1rz7jxmgsgyjwa6erusxlzrmg2aw3cvyf3c3x6v",
                    shares_amount:10000000000000000000
                }
            };

            execute(tx);
        });


        it('test MsgWithdrawDelegatorRewardsAll', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:28 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.withdrawDelegationRewardsAll.type,
                //mode: config.iris.mode.try
            };

            execute(tx);
        });

        it('test MsgWithdrawDelegatorReward', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:14 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.withdrawDelegationReward.type,
                msg: {
                    validator_addr: "fva1kca5vw7r2k72d5zy0demszmrhdz4dp8t4uat0c",
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
                sequence:20 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.transfer.type,
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
                sequence:2 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.delegate.type,
                msg: {
                    validator_addr: "fva1kca5vw7r2k72d5zy0demszmrhdz4dp8t4uat0c",
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
                type: Irisnet.config.iris.tx.unbond.type,
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
                type: Irisnet.config.iris.tx.redelegate.type,
                msg: {
                    validator_src_addr: "fva1cr6xfpp078nm7yfsh36850ftu20fl3c9duchrk",
                    validator_dst_addr: "fva1xde0yh9vmc8mnkdvdr5krllfe3gslw9d4qp2wd",
                    shares_amount:10000000000000000000
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
                type: Irisnet.config.iris.tx.withdrawDelegationRewardsAll.type,
            };

            extracted(tx);
        });

        it('test MsgWithdrawDelegatorReward', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence:26 ,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.withdrawDelegationReward.type,
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
        //①先用联网的钱包构造一笔交易
        let signMsg = builder.buildTx(tx);
        //②把步骤①的结构序列化为字符串，装入二维码
        let signStr = JSON.stringify(signMsg);
        console.log("======热钱包传递给冷钱包签名的字符串======");
        console.log(signStr);
        console.log("======热钱包传递给冷钱包签名的字符串======");

        //③用未联网的钱包(存有账户秘钥)扫描步骤②的二维码，拿到待签名的字符串，调用signTx签名
        let stdTx = builder.signTx(signStr, privateKey);
        console.log("======待提交交易======");
        //④步骤③的结果调用GetPostData，得到交易字符串，回传给联网的钱包，并发送该内容给irishub-server
        console.log(JSON.stringify(stdTx.GetData()));
        console.log("======待提交交易======");

        //以下步骤为异常处理：在请求irishub-server超时的时候，服务器可能没有任何返回结果，这笔交易状态为止，所以需要客户端计算出
        //本次交易的hash，校准该笔交易的状态。调用步骤③结构的Hash，可以得到交易hash以及本次交易内容的base64编码（以后考虑使用该编码内容替换
        // GetPostData,解耦crypto和irishub交易结构的依赖）
        let result = stdTx.Hash();
        console.log("data:", result.data);
        console.log("hash", result.hash);
    }

    //热钱包调用
    function execute(tx) {
        let builder = Irisnet.getBuilder(chain);
        let stdTx = builder.buildAndSignTx(tx,privateKey);
        console.log("======stdTx======");
        console.log(JSON.stringify(stdTx.GetData()));
        // console.log("======待提交交易======");
        //console.log(JSON.stringify(stdTx.GetPostData()));
        // console.log("======待提交交易======");
        let result = stdTx.Hash();
        console.log("data:",result.data);
        console.log("hash",result.hash);
    }
});