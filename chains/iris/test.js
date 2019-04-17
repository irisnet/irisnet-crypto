const Irisnet = require('../../index');
const chai = require('chai');
const util = require('../../util/utils');
const codec = require('../../util/codec');
const assert = chai.assert;


describe('CryPto iris test', function () {

    //测试账户相关信息
    describe('test account', function () {
        it('test create and recover', function () {
            let str = "";
            for (let i = 0;i<300000;i++){
                let crypto = Irisnet.getCrypto(Irisnet.config.chain.iris,'testnet');
                let keyPair = crypto.create(Irisnet.config.language.en);
                let keyPair2 = crypto.recover(keyPair.phrase, Irisnet.config.language.en);
                console.log(i);
                assert.deepEqual(keyPair, keyPair2);
                str += (JSON.stringify(keyPair) + "\n")
            }
            let fs = require("fs");
            fs.writeFileSync('./input.txt',str);
            fs.close()
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
            let crypto = Irisnet.getCrypto(Irisnet.config.chain.iris,"testnet");
            let account = crypto.recover("");
            console.log(account);
            //console.log(codec.Bech32.fromBech32("fap1addwnpepqtdme789cpm8zww058ndlhzpwst3s0mxnhdhu5uyps0wjucaufha6v3ce99"))
        });

        it('test hasRepeatElement', function () {
            let testStr = "detect jealous tumble tumble";
            let result = util.hasRepeatElement(testStr, " ");
            assert.isTrue(result);

            result = util.hasRepeatElement("detect jealous layer", " ");
            assert.isNotTrue(result);

            let arr = ["detect","jealous","jealous","layer"];
            result = util.hasRepeatElement(arr);
            assert.isTrue(result);

            let arr2 = ["detect","jealous","layer"];
            result = util.hasRepeatElement(arr2);
            assert.isNotTrue(result);

        });
    });


    let chain_id = "hash";
    let from = "faa1aake3umjllpd9es5d3qmry4egcne0f8a8u5rsx";
    let gas = 10000;
    let account_number = 0;
    let fees = {denom: "iris-atto", amount: 600000000000000000};
    let memo = "1";
    let privateKey = "465820F3AC6B406F8D599E558ACC48A135C57A2537CB96EF544A3D66449E7D63";
    let pubKey = "fap1addwnpepqtdme789cpm8zww058ndlhzpwst3s0mxnhdhu5uyps0wjucaufha6v3ce99";
    let chain = Irisnet.config.chain.iris;


    //测试热钱包相关交易
    describe('test wallet tx', function () {
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

            execute(tx);
        });

        it('test build', function () {
            let tx = {
                chain_id: "irishub",
                from: "iaa1wcsa554l5lx99ylu94ujlxuu6jkvacvpp63ajc",
                account_number: 8001,
                sequence: 3,
                fees: {denom: "iris-atto", amount: 100000000000000000},
                gas: 10000,
                memo: "MaxSon",
                type: Irisnet.config.iris.tx.transfer.type,
                msg: {
                    to: "iaa1lsudh3c5sn5xnwv8ewte0qpt4l7c82hh8zquzq",
                    coins: [
                        {
                            denom: "iris-atto",
                            amount: "1475664988324501700000000"
                        }
                    ]
                }
            };

            let pubkey = "eb5ae9872102ac8f8789b3c70aefcbd6a2bafca472922d04ed199db53df71586916634873021";
            let sig = "14bc7cccc95e9b92454d25a1b3b5c2ec9ab7d6d04da8405e3899e69643bf76a12d4206a0e8d9c69e2abd58a662b14815b393061fc6376e75b8cb13dc33285f10";
            let Codec = require("../../util/codec")

            let builder = Irisnet.getBuilder(chain);
            let signature = {
                pub_key:Codec.Hex.hexToBytes(pubkey),
                signature:Codec.Hex.hexToBytes(sig),
        };
            //①先用联网的钱包构造一笔交易
            let stdTx = builder.buildTx(tx);
            stdTx.SetSignature(signature);
            console.log("stdtx", JSON.stringify(stdTx.GetData()));
            let result = stdTx.Hash();
            console.log("hash", result.hash);
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

            execute(tx);
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
                type: Irisnet.config.iris.tx.unbond.type,
                msg: {
                    validator_addr: "fva1aake3umjllpd9es5d3qmry4egcne0f8ajd7vdp",
                    shares_amount: "1000000000000000000000000"
                }
            };

            execute(tx);
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

            execute(tx);
        });


        it('test MsgWithdrawDelegatorRewardsAll', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 55,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.withdrawDelegationRewardsAll.type,
                //mode: Irisnet.config.iris.mode.try
            };

            execute(tx);
        });

        it('test MsgWithdrawDelegatorReward', function () {
            let tx = {
                chain_id: chain_id,
                from: from,
                account_number: account_number,
                sequence: 42,
                fees: fees,
                gas: gas,
                memo: memo,
                type: Irisnet.config.iris.tx.withdrawDelegationReward.type,
                msg: {
                    validator_addr: "fva1aake3umjllpd9es5d3qmry4egcne0f8ajd7vdp",
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
                type: Irisnet.config.iris.tx.unbond.type,
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
    });
    //冷钱包调用
    function extracted(tx,chain = 'iris') {
        let builder = Irisnet.getBuilder(chain);
        //①先用联网的钱包构造一笔交易
        let stdTx = builder.buildTx(tx);
        //②把步骤①的结构序列化为字符串，装入二维码
        let signStr = JSON.stringify(stdTx.GetSignBytes());
        //③用未联网的钱包(存有账户秘钥)扫描步骤②的二维码，拿到待签名的字符串，调用signTx签名
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
        let result = stdTx.Hash();
        console.log("data:", result.data);
        console.log("hash", result.hash);
        //console.log("displayContent", JSON.stringify(stdTx.GetDisplayContent()));

    }

    //热钱包调用
    function execute(tx,chain = 'iris') {
        let builder = Irisnet.getBuilder(chain,'testnet');
        let stdTx = builder.buildAndSignTx(tx, privateKey);
        console.log("======stdTx======");
        console.log(JSON.stringify(stdTx.GetData()));
        console.log(JSON.stringify(stdTx));
        let result = stdTx.Hash();
        //console.log("data:", result.data);
        console.log("hash", result.hash);
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