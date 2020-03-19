const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;

const common = require('./common');
const url ="https://irisnet-lcd.dev.bianjie.ai/tx/broadcast?commit=true";
const chainName ="iris";


describe('iris transaction', function () {

    let chain_id = "rainbow-dev";
    let from = "faa176dd0tgn38grpc8hpxfmwl6sl8jfmknesgawx7";
    let gas = 100000;
    let account_number = 3;
    let fees = {denom: "iris-atto", amount: 600000000000000000};
    let memo = "1";
    let privateKey = "A3ACB76D1047ED290D3D1E3ABB51375F16D2887DBC6821F43B9965C4D11F00FA";
    let pubKey = "fap1addwnpepqwqw5pshzzswemf6t00xvf0ccf2fxslaz40dp76uyad5mgujfju4zt8km3u";
    let chain = Irisnet.config.chain.iris;



    //测试热钱包相关交易
    describe('test warm wallet tx', function () {
        it('test simulate transfer', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 57,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.transfer.type,
                mode: Irisnet.config.iris.mode.try,
                msg: {
                    to: "faa1s6v9qgu8ye7d884s8kpye64x66znndg8t6eztj",
                    coins: [
                        {
                            denom: "iris-atto",
                            amount: 10000000000000000000
                        }
                    ]
                }
            };

            simulate(tx);
        });

        it('test transfer', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 57,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.transfer.type,
                msg: {
                    to: "faa1s6v9qgu8ye7d884s8kpye64x66znndg8t6eztj",
                    coins: [
                        {
                            denom: "iris-atto",
                            amount: 10000000000000000000
                        }
                    ]
                }
            };

            common.verifyTx(url,tx,privateKey,chainName,verify);
        });

        it('test delegate', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 12,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.delegate.type,
                msg: {
                    validator_addr: "fva1aake3umjllpd9es5d3qmry4egcne0f8ajd7vdp",
                    delegation: {
                        denom: "iris-atto",
                        amount: 1000000000000000000000000
                    }
                }
            };

            common.verifyTx(url,tx,privateKey,chainName,verify);
        });

        it('test BeginUnbonding', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 43,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.undelegate.type,
                msg: {
                    validator_addr: "fva1aake3umjllpd9es5d3qmry4egcne0f8ajd7vdp",
                    shares_amount: "1000000000000000000000000"
                }
            };

            common.verifyTx(url,tx,privateKey,chainName,verify);
        });

        it('test BeginRedelegate', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 22,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.redelegate.type,
                msg: {
                    validator_src_addr: "fva1kca5vw7r2k72d5zy0demszmrhdz4dp8t4uat0c",
                    validator_dst_addr: "fva1rz7jxmgsgyjwa6erusxlzrmg2aw3cvyf3c3x6v",
                    shares_amount: "1000000000000000000000000"
                }
            };

            common.verifyTx(url,tx,privateKey,chainName,verify);
        });

        it('test MsgWithdrawValidatorRewardsAll', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 32,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.withdrawValidatorRewardsAll.type,
                msg: {
                    validator_addr: "fva186qhtc62cf6ejlt3erw6zk28mgw8ne7grhmyfn",
                }
                //mode: Irisnet.config.iris.mode.try
            };
            // extracted(tx);
            common.verifyTx(url,tx,privateKey,chainName,verify);
        });

        it('test MsgWithdrawDelegatorRewardsAll', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 25,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.withdrawDelegationRewardsAll.type,
                //mode: Irisnet.config.iris.mode.try
            };

            common.verifyTx(url,tx,privateKey,chainName,verify);
        });

        it('test MsgWithdrawDelegatorReward', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 94,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.withdrawDelegationReward.type,
                msg: {
                    validator_addr: "fva16jr2kxm8xwaux7tkv0sux0qgn8xqp9nkj27ane",
                }
            };

            common.verifyTx(url,tx,privateKey,chainName,verify);
        });

        it('test MsgSetWithdrawAddress', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 121,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.setWithdrawAddress.type,
                msg: {
                    withdraw_addr: "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm",
                }
            };

            common.verifyTx(url,tx,privateKey,chainName,verify);
        });
    });

    //测试冷钱包相关交易
    describe('test cold wallet tx ', function () {
        it('test transfer', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 53,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.transfer.type,
                msg: {
                    to: "faa1s6v9qgu8ye7d884s8kpye64x66znndg8t6eztj",
                    coins: [
                        {
                            denom: "iris-atto",
                            amount: 10000000000000000000
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
                sequence: 55,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.delegate.type,
                msg: {
                    validator_addr: "fva1kca5vw7r2k72d5zy0demszmrhdz4dp8t4uat0c",
                    delegation: {
                        denom: "iris-atto",
                        amount: 10000000000000000000
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
                sequence: 45,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.undelegate.type,
                msg: {
                    validator_addr: "fva16h3uazd2wknrae7ql0dqpjw69s5kp44slme6hr",
                    shares_amount: "10000000000000000000"
                }
            };

            extracted(tx);
        });

        it('test BeginRedelegate', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 20,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.redelegate.type,
                msg: {
                    validator_src_addr: "fva1cr6xfpp078nm7yfsh36850ftu20fl3c9duchrk",
                    validator_dst_addr: "fva1xde0yh9vmc8mnkdvdr5krllfe3gslw9d4qp2wd",
                    shares_amount: "10000000000000000000"
                }
            };

            extracted(tx);
        });

        it('test MsgWithdrawDelegatorRewardsAll', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 46,
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
                sequence: 26,
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

        it('test MsgSetWithdrawAddress', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 112,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.setWithdrawAddress.type,
                msg: {
                    withdraw_addr: "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm",
                }
            };

            extracted(tx);
        });

        it('test MsgDeposit', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 11,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.deposit.type,
                msg: {
                    proposal_id : 3,
                    amount : [
                        {
                            denom: "iris-atto",
                            amount: 3000000000000000000000
                        }
                    ]
                }
            };

            extracted(tx);
        });

        it('test MsgVote', function () {
            this.timeout(10000);
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 13,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.vote.type,
                msg: {
                    proposal_id : 3,
                    option: 0x01
                }
            };

            extracted(tx);
        });
    });

    //冷钱包调用
    function extracted(tx, chain = 'iris') {
        let builder = Irisnet.getBuilder(chain,'testnet');
        //①先用联网的钱包构造一笔交易
        let stdTx = builder.buildTx(tx);
        //②把步骤①的结构序列化为字符串，装入二维码
        let signStr = JSON.stringify(stdTx.GetSignBytes());
        //③用未联网的钱包(存有账户秘钥)扫描步骤②的二维码，拿到待签名的字符串，调用signTx签名
        console.log("GetSignBytes:", signStr);
        let signature = builder.sign(signStr, privateKey);
        //④
        let signatureStr = JSON.stringify(signature);//二维码字符串
        stdTx.SetSignature(signatureStr);
        //console.log("======待提交交易======");
        //④步骤③的结果调用GetData，得到交易字符串，回传给联网的钱包，并发送该内容给irishub-server
        console.log(JSON.stringify(stdTx.GetData()));

        //以下步骤为异常处理：在请求irishub-server超时的时候，服务器可能没有任何返回结果，这笔交易状态为止，所以需要客户端计算出
        //本次交易的hash，校准该笔交易的状态。调用步骤③结构的Hash，可以得到交易hash以及本次交易内容的base64编码（以后考虑使用该编码内容替换
        // GetPostData,解耦crypto和irishub交易结构的依赖）

        let postTx = stdTx.GetData();
        postTx.mode = "commit";
        let resp = common.sendBySync("POST",url,postTx);
        let result = stdTx.Hash();
        console.log("data:", result.data);
        console.log("hash", result.hash);

        console.log(`hash=${result.hash}`);
        assert.notExists(resp.code,`tx commit failed,${resp.raw_log}`);
        //console.log("displayContent", JSON.stringify(stdTx.GetDisplayContent()));

    }

    //simulate
    function simulate(tx) {
        let builder = Irisnet.getBuilder(chain);
        let stdTx = builder.buildAndSignTx(tx);
        stdTx.SetPubKey(pubKey);
        console.log("======stdTx======");
        console.log(JSON.stringify(stdTx.GetData()));
        // console.log("======待提交交易======");
        let result = stdTx.Hash();
        console.log("hash", result.hash);
    }
});

function verify(act,exp,data) {
    console.log('result:',act,exp,data);
    assert.notExists(act.check_tx.code,`tx commit failed,${act.check_tx.log}`);
}
