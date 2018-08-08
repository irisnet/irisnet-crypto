const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;
const blockChainThriftModel = require("blockchain-rpc/codegen/gen-nodejs/model_types");
const Codec = require("../util/codec");

describe('CryPto test', function () {
    describe('irisnet-crypto', function () {
        it('test create and recover', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let keyPair = crypto.create("english");
            console.log(JSON.stringify(keyPair));
            let keyPair2 = crypto.recover(keyPair.phrase,"english");
            assert.deepEqual(keyPair, keyPair2);
        });

        it('bech32', function () {
            console.log(Codec.Bech32.fromBech32("faa1cmjnj9zw0m4aau95dsmzj7zgaqagptzywu3v8r"));
            console.log(Codec.Bech32.toBech32("faa","8698502387267CD39EB03D824CEAA6D68539B507"));
        });

        it('test import', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let account = crypto.import("8789EB2C2510D8D236EB85DAEFE4E1A4EA7D8E6929E0A1400FCF2848CF7F2DA4")
            assert.deepEqual(account, {
                    address: 'faa1a89us8tvt3d9qpq7j6p06dc3z88n576shj8k2h',
                    phrase: null,
                    privateKey: '8789EB2C2510D8D236EB85DAEFE4E1A4EA7D8E6929E0A1400FCF2848CF7F2DA4',
                    publicKey: 'fap1addwnpepqd7def2xt3vtwu8fparpdc8nkduqpfl9nth7re0f3ls73x6nnes6saayamy'
                }
            );
        });

        it('test recover', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let account = crypto.recover("beach paddle tray erupt soup powder fortune essence suit quality autumn cotton bubble direct cash route blast cabin wool ranch boring depart lemon hat");
            assert.deepEqual(account, {
                    address: 'faa1cmjnj9zw0m4aau95dsmzj7zgaqagptzywu3v8r',
                    phrase: 'beach paddle tray erupt soup powder fortune essence suit quality autumn cotton bubble direct cash route blast cabin wool ranch boring depart lemon hat',
                    privateKey: '60F95C4585E42E41EE50F2C6CCAA1BBD6A9254602C4F5C934DCB5AAA28DD2FE0',
                    publicKey: 'fap1addwnpepqd3kns6jqsanqjprvxnsj3rhmxfr9607mmy49ypg24p22f57pp446n0sz6v'
                }
            );
        });

        it('test transfer', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":0,
                "ext":3,
                "sender":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"faa1a89us8tvt3d9qpq7j6p06dc3z88n576shj8k2h"
                },
                "receiver":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"faa1s6v9qgu8ye7d884s8kpye64x66znndg8t6eztj"
                },
                "amount":[new blockChainThriftModel.Coin({denom: "iris",amount: 10})],
                "fee":new blockChainThriftModel.Fee({denom: "iris",amount: 0}),
                "type":Irisnet.Constants.IRIS.TxType.TRANSFER,
                "memo":new blockChainThriftModel.Memo({id:1,text:"test"})
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"8789EB2C2510D8D236EB85DAEFE4E1A4EA7D8E6929E0A1400FCF2848CF7F2DA4");
            console.log(JSON.stringify(stdTx))
            //TODO 将stdTx提交到iris-hub[/tx/send]
        });

        //冷钱包
        it('test buildTx and signTx', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":35,
                "ext":0,
                "sender":{
                    "chain":"fuxi-develop",
                    "app":"v0.2.0",
                    "addr":"1EC2E86065D5EF88A3ED65B8B3A43210FAD9C7B2"
                },
                "receiver":{
                    "chain":"iris",
                    "app":"v0.2.0",
                    "addr":"3A058A8B5468AE0EA2D2517CE3BAFDD281E50C2F"
                },
                "amount":[new blockChainThriftModel.Coin({denom: "iris",amount: 10})],
                "fee":new blockChainThriftModel.Fee({denom: "iris",amount: 0}),
                "type":Irisnet.Constants.IRIS.TxType.TRANSFER
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let signMsg = builder.buildTx(tx);
            console.log(JSON.stringify(signMsg));
            let stdTx = builder.signTx(signMsg,"E9B05BF448FFDFC91EB2149BD5309342DCFC87FC3FBB3DE16256585FB407363A");
            console.log(JSON.stringify(stdTx))
            //TODO 将stdTx提交到iris-hub[/tx/send]
        });

        it('test delegate', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":14,
                "ext":0,
                "sender":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq"
                },
                "receiver":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq"
                },
                "amount":[new blockChainThriftModel.Coin({denom: "iris",amount: "10"})],
                "fee":new blockChainThriftModel.Fee({denom: "iris",amount: "0"}),
                "type":Irisnet.Constants.IRIS.TxType.DELEGATE,
                "memo":new blockChainThriftModel.Memo({id:1,text:"test"})
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"E9B05BF448FFDFC91EB2149BD5309342DCFC87FC3FBB3DE16256585FB407363A");
            console.log(JSON.stringify(stdTx))
            //TODO 将stdTx提交到iris-hub[/tx/send]
        });

        it('test BeginUnbonding', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":9,
                "ext":0,
                "sender":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq"
                },
                "receiver":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq"
                },
                "amount":[new blockChainThriftModel.Coin({denom: "iris",amount: "20/1"})],
                "fee":new blockChainThriftModel.Fee({denom: "iris",amount: "0"}),
                "type":Irisnet.Constants.IRIS.TxType.BEGINUNBOND,
                "memo":new blockChainThriftModel.Memo({id:1,text:"test"})
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"E9B05BF448FFDFC91EB2149BD5309342DCFC87FC3FBB3DE16256585FB407363A");
            console.log(JSON.stringify(stdTx))
            //TODO 将stdTx提交到iris-hub[/tx/send]
        });

        it('test CompleteUnbonding', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":10,
                "ext":0,
                "sender":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq"
                },
                "receiver":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq"
                },
                "amount":[new blockChainThriftModel.Coin({denom: "iris",amount: "10/1"})],
                "fee":new blockChainThriftModel.Fee({denom: "iris",amount: "0"}),
                "type":Irisnet.Constants.IRIS.TxType.COMPLETEUNBOND,
                "memo":new blockChainThriftModel.Memo({id:1,text:"test"})
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"E9B05BF448FFDFC91EB2149BD5309342DCFC87FC3FBB3DE16256585FB407363A");
            console.log(JSON.stringify(stdTx))
            //TODO 将stdTx提交到iris-hub[/tx/send]
        });

        //冷钱包
        it('test signMsg', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":0,
                "ext":0,
                "sender":{
                    "chain":"fuxi-develop",
                    "app":"v0.2.0",
                    "addr":"1EC2E86065D5EF88A3ED65B8B3A43210FAD9C7B2"
                },
                "receiver":{
                    "chain":"iris",
                    "app":"v0.2.0",
                    "addr":"3A058A8B5468AE0EA2D2517CE3BAFDD281E50C2F"
                },
                "amount":[new blockChainThriftModel.Coin({denom: "atom",amount: 10})],
                "fee":new blockChainThriftModel.Fee({denom: "",amount: 0}),
                "type":Irisnet.Constants.IRIS.TxType.TRANSFER,
                "memo":new blockChainThriftModel.Memo({id: 0,text: "test"})
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let signMsg = builder.buildTx(tx);
            let msgBytes = JSON.stringify(signMsg.GetSignBytes());
            console.log(msgBytes);
            let msgHex = Codec.Hex.stringToHex(msgBytes);
            let sigByte = Codec.Hex.hexToBytes(msgHex);
            console.log(sigByte.toString());
        });

        it('test codec', function () {
            let s = Codec.Hex.hexToBytes("1EC2E86065D5EF88A3ED65B8B3A43210FAD9C7B2")
            let s1 = Codec.Bech32.fromBech32("cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq");
            console.log(s);
            console.log(s1);
        })
    });
});