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
            let keyPair2 = crypto.recover(keyPair.phrase,"english");
            assert.deepEqual(keyPair, keyPair2);
        });

        it('bech32', function () {
            console.log(Codec.Bech32.fromBech32("cosmosaccaddr10t42vrpen285fmmy7003cvtgy3du2w8d650h3x"));
        });

        it('test import', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let account = crypto.import("E9B05BF448FFDFC91EB2149BD5309342DCFC87FC3FBB3DE16256585FB407363A")
            assert.deepEqual(account, {
                    address: 'DA16415D899555501471A3763F3C0B5EA380E287',
                    phrase: null,
                    privateKey: 'E9B05BF448FFDFC91EB2149BD5309342DCFC87FC3FBB3DE16256585FB407363A',
                    publicKey: 'EB5AE98721026FD7CDF90DF4756B476EA6804E9DF4D11892ADF10247FB26F5F731A12F2CEB30'
                }
            );
        });

        it('test recover', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let account = crypto.recover("prevent body bachelor lawsuit angry yard squeeze forest young category bargain crash sausage consider amateur next senior burger average state record edit topic abstract");
            console.log(JSON.stringify(account))
        });

        it('test transfer', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":13,
                "ext":0,
                "sender":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq"
                },
                "receiver":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"cosmosaccaddr1tjl6adsm86n6zlca0ysw4rj9e63v3nqlac39mh"
                },
                "amount":[new blockChainThriftModel.Coin({denom: "iris",amount: 10})],
                "fee":new blockChainThriftModel.Fee({denom: "iris",amount: 0}),
                "type":Irisnet.Constants.IRIS.TxType.TRANSFER,
                "memo":new blockChainThriftModel.Memo({id:1,text:"test"})
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"E9B05BF448FFDFC91EB2149BD5309342DCFC87FC3FBB3DE16256585FB407363A");
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