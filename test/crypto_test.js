const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;
const blockChainThriftModel = require("blockchain-rpc/codegen/gen-nodejs/model_types");
const bech32 = require("../util/bech32");
const utils = require("../util/utils");
const bank = require("../chains/iris/bank");

describe('CryPto test', function () {
    describe('irisnet-crypto', function () {
        it('test create and recover', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let keyPair = crypto.create("english");
            let keyPair2 = crypto.recover(keyPair.phrase,"english");
            assert.deepEqual(keyPair, keyPair2);
        });

        it('bech32', function () {
            console.log(bech32.fromBech32("cosmosaccaddr1tgemrgv9ljguecf2mgkj7r3sv3ad9fgvatnp39"));
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
            let account = crypto.recover("make question surge quality regret juice snack box other slim wild unknown route degree arm abandon");
            console.log(JSON.stringify(account))
        });

        it('test transfer', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":"0",
                "ext":2,
                "sender":{
                    "chain":"fuxi-develop",
                    "app":"v0.2.0",
                    "addr":"9778915A4BF434C86A62C2FF45C2FCAE84AF458B"
                },
                "receiver":{
                    "chain":"fuxi-develop",
                    "app":"v0.2.0",
                    "addr":"AD004D588925191653F47BACE51C23133D4EDBE1"
                },
                "amount":[new blockChainThriftModel.Coin({denom: "iris",amount: 10})],
                "fee":new blockChainThriftModel.Fee({denom: "iris",amount: 0}),
                "type":Irisnet.Constants.IRIS.TxType.TRANSFER
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"2233230fa9326b52b33178273a6b356479933dd71f64c9409c5edc76d425f63ff9e164fb91f7f6ebb02d85fa0491a4e81eb9245680940c4ecf30324ab04ae6cd");
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
            let stdTx = builder.signTx(signMsg,"625f0968c78d95857629ea4b4cbafe2f3f949a92e82dda09b5fbe9fbc70d50cc62f3621a751f0431b69b965d41ec480f1b9a4b6f14a1f6c0d17158281a980f74");
            console.log(JSON.stringify(stdTx))
            //TODO 将stdTx提交到iris-hub[/tx/send]
        });

        it('test delegate', function () {
            let tx = new blockChainThriftModel.Tx({"sequence":2,"amount":[{"amount":-1,"denom":"iris"}],"fee":{"amount":0,"denom":"iris"},"receiver":{"chain":"fuxi-develop","app":"sigs","addr":"507405661F2DB1940941FA0A6B3642015A015387"},"sender":{"chain":"fuxi-develop","app":"sigs","addr":"9778915A4BF434C86A62C2FF45C2FCAE84AF458B"},"type":"delegate","ext":2});

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"2233230fa9326b52b33178273a6b356479933dd71f64c9409c5edc76d425f63ff9e164fb91f7f6ebb02d85fa0491a4e81eb9245680940c4ecf30324ab04ae6cd");
            console.log(JSON.stringify(stdTx))
            //TODO 将stdTx提交到iris-hub[/tx/send]
        });

        it('test getAddress', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let addrBech32 = crypto.getAddress("b6be55dab3f686e2e60c0e5272a45905d4ec826dfd72334e8def519542cee915");
            let addr = bech32.fromBech32(addrBech32);
            assert.deepEqual(addr, "33FA54A78EDE1B22A55185DB06438078D7226436");
        });

        it('test create', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let keypair = crypto.create();
            console.log(JSON.stringify(keypair));
            let keypair2 = crypto.recover(keypair.phrase);
            assert.deepEqual(keypair, keypair2);
        });

        it('test sortObjectKeys', function () {
            let msg = new bank.MsgSend("input","output",[new bank.Coin(10,"atom")]);
            let s = JSON.stringify(utils.sortObjectKeys(msg));
            let expected = '{"inputs":[{"address":"input","coins":[{"amount":"10","denom":"atom"}]}],"outputs":[{"address":"output","coins":[{"amount":"10","denom":"atom"}]}]}';
            assert.deepEqual(s, expected);
        });

    });
});