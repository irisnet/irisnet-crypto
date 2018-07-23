const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;
const blockChainThriftModel = require("blockchain-rpc/codegen/gen-nodejs/model_types");
const bech32 = require("../util/bech32");
const utils = require("../util/utils");
const bank = require("../chains/iris/bank");
const stake = require("../chains/iris/stake");
const Hex = require("../util/hex");

describe('CryPto test', function () {
    describe('irisnet-crypto', function () {
        it('test create and recover', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let keyPair = crypto.create("english");
            let keyPair2 = crypto.recover(keyPair.phrase,"english");
            assert.deepEqual(keyPair, keyPair2);
        });

        it('bech32', function () {
            console.log(bech32.fromBech32("cosmosaccaddr10t42vrpen285fmmy7003cvtgy3du2w8d650h3x"));
        });

        it('test import', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let account = crypto.import("833a2457add0d23c840edb115e07069465ca04942406f799ea7128c3bc9b842f515fbd60f777a55d2c59069892b6e72e57fdc96da4b608cd07c86306d0ab6439")
            assert.deepEqual(account, {
                    address: '4B0647A2FECBBB752C8C5134963EB0DF159E8501',
                    phrase: null,
                    privateKey: '833a2457add0d23c840edb115e07069465ca04942406f799ea7128c3bc9b842f515fbd60f777a55d2c59069892b6e72e57fdc96da4b608cd07c86306d0ab6439',
                    publicKey: '515fbd60f777a55d2c59069892b6e72e57fdc96da4b608cd07c86306d0ab6439'
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
                "sequence":8,
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
                "amount":[new blockChainThriftModel.Coin({denom: "iris",amount: "10"})],
                "fee":new blockChainThriftModel.Fee({denom: "iris",amount: "0"}),
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


        it('test create', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let keypair = crypto.create();
            console.log(JSON.stringify(keypair));
            let keypair2 = crypto.recover(keypair.phrase);
            assert.deepEqual(keypair, keypair2);
        });

        it('test sortObjectKeys', function () {
            let msg = bank.NewMsgSend("input","output",[bank.NewCoin(10,"atom")]);
            let s = JSON.stringify(utils.sortObjectKeys(msg));
            let expected = '{"inputs":[{"address":"input","coins":[{"amount":"10","denom":"atom"}]}],"outputs":[{"address":"output","coins":[{"amount":"10","denom":"atom"}]}]}';
            assert.deepEqual(s, expected);
        });

        it('test delegateMsg', function () {
            let msg = stake.NewDelegateMsg("cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq","cosmosaccaddr1mgtyzhvfj424q9r35dmr70qtt63cpc58dct7jq",{denom: "iris",amount: "10"});
            console.log(JSON.stringify(msg.GetSignBytes()))
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
            let msgBytes = JSON.stringify(signMsg.msg.GetSignBytes());
            console.log(msgBytes);
            let msgHex = Hex.stringToHex(msgBytes);
            let sigByte = Hex.hexToBytes(msgHex);
            console.log(sigByte.toString());
        });
    });
});