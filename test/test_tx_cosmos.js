const Irisnet = require('../index');
const common = require('./common');
const chai = require('chai');
const assert = chai.assert;

const host ="http://192.168.150.31:21317";
const url = host + "/txs";
//const lcdServer ="http://127.0.0.1:1317/txs";

describe('cosmos transaction', function () {
    let chain_id = "cosmos-dev";
    let from = "cosmos1r33tlrh7cawtzxmct7zatau6vdydp0rg5s6vyg";
    let gas = 200000;
    let account_number = 0;
    let fees = {denom: "stake", amount: "2"};
    let privateKey = "67F17C4F34C4353A6AABD5175FD9A7C452CF5AA18C65CC5A539145A928F93ADE";

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

    it('test MsgDeposit', function () {
        let seq = common.getSequence(host,from);
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: seq,
            fees: fees,
            gas: gas,
            memo: common.randomWord(100),
            type: Irisnet.config.cosmos.tx.deposit.type,
            msg: {
                proposal_id : 22,
                amount : [
                    {
                        denom: "stake",
                        amount: 10000
                    }
                ]
            }
        };
        common.verifyTx(url,tx,privateKey,chainName,verify);
    });

    it('test MsgVote', function () {
        let seq = common.getSequence(host,from);
        this.timeout(10000);
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: seq,
            fees: fees,
            gas: gas,
            memo: common.randomWord(100),
            type: Irisnet.config.cosmos.tx.vote.type,
            msg: {
                proposal_id : 23,
                option: 0x02
            }
        };
        // common.verifyTx(url,tx,privateKey,chainName,verify);
        extracted(tx);
    });

    //冷钱包调用
    function extracted(tx, chain = 'cosmos') {
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
        console.log('GetData:',JSON.stringify(stdTx.GetData()));
        console.log('GetDisplayContent:',JSON.stringify(stdTx.GetDisplayContent()));

        //以下步骤为异常处理：在请求irishub-server超时的时候，服务器可能没有任何返回结果，这笔交易状态为止，所以需要客户端计算出
        //本次交易的hash，校准该笔交易的状态。调用步骤③结构的Hash，可以得到交易hash以及本次交易内容的base64编码（以后考虑使用该编码内容替换
        // GetPostData,解耦crypto和irishub交易结构的依赖）

        let postTx = stdTx.GetData();
        // postTx.mode = "commit";
        let resp = common.sendBySync("POST",url,postTx);
        let result = stdTx.Hash();
        console.log("data:", result.data);
        console.log("hash", result.hash);

        console.log(`hash=${result.hash}`);
        assert.notExists(resp.code,`tx commit failed,${resp.raw_log}`);
        //console.log("displayContent", JSON.stringify(stdTx.GetDisplayContent()));

    }

    // //simulate
    // function simulate(tx) {
    //     let builder = Irisnet.getBuilder(chain);
    //     let stdTx = builder.buildAndSignTx(tx);
    //     stdTx.SetPubKey(pubKey);
    //     console.log("======stdTx======");
    //     console.log(JSON.stringify(stdTx.GetData()));
    //     // console.log("======待提交交易======");
    //     let result = stdTx.Hash();
    //     console.log("hash", result.hash);
    // }

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
    console.log('result:',act,exp,data)
    assert.notExists(act.code,`tx commit failed,${act.raw_log}`);
}
