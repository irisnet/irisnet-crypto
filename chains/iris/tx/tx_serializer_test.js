const Irisnet = require('../../../index');
const blockChainThriftModel = require("irisnet-rpc/common/codegen/gen-nodejs/model_types");
//const amino = require("./std_tx");

describe('CryPto test', function () {
    it('test SendTx', function () {
        let senderAddr = "faa1l8jtnrchq4j0tn8dacd5w875j96nj59hk0h4x6";
        let receiverAddr = "faa14q3lumvq32jwk0zu4plslarqefj5vzdeleraes";
        let amtV = 10000000000000000000;
        let feeAmtV = 400000000000000000;
        let denom = "iris-atto";
        let gas = 200000;
        let chainID = "fuxi-4000";
        let AccountNumber = 0; //0需要特殊处理
        let Sequence = 250;
        let memo = "";
        let priKey = "730131E9E44DED08E5EA23E324097C0E072DC65053523760E151B74193BF1403";

        //构造交易
        let tx = new blockChainThriftModel.Tx({
            "sequence":Sequence,
            "ext":AccountNumber,
            "sender":{
                "chain":chainID,
                "app":"v0.2.0",
                "addr":senderAddr
            },
            "receiver":{
                "chain":chainID,
                "app":"v0.2.0",
                "addr":receiverAddr
            },
            "amount":[new blockChainThriftModel.Coin({denom: denom,amount: amtV})],
            "fee":new blockChainThriftModel.Fee({denom: denom,amount: feeAmtV}),
            "type":Irisnet.Constants.IRIS.TxType.TRANSFER,
            "memo":new blockChainThriftModel.Memo({id:1,text:memo})
        });
        tx.gas = gas;

        let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
        let stdTx = builder.buildAndSignTx(tx,priKey);
        console.log(JSON.stringify(stdTx.GetPostData()));

        let result = stdTx.Hash();
        console.log("marshal bytes",JSON.stringify(result.data));
        console.log("tx hash",result.hash);
    });

    it('test DelegateTx', function () {
        let senderAddr = "faa1l8jtnrchq4j0tn8dacd5w875j96nj59hk0h4x6";
        let receiverAddr = "faa14q3lumvq32jwk0zu4plslarqefj5vzdeleraes";
        let amtV = 10000000000000000000;
        let feeAmtV = 400000000000000000;
        let denom = "iris-atto";
        let gas = 200000;
        let chainID = "fuxi-4000";
        let AccountNumber = 0; //0需要特殊处理
        let Sequence = 250;
        let memo = "";
        let priKey = "730131E9E44DED08E5EA23E324097C0E072DC65053523760E151B74193BF1403";

        //构造交易
        let tx = new blockChainThriftModel.Tx({
            "sequence":Sequence,
            "ext":AccountNumber,
            "sender":{
                "chain":chainID,
                "app":"v0.2.0",
                "addr":senderAddr
            },
            "receiver":{
                "chain":chainID,
                "app":"v0.2.0",
                "addr":receiverAddr
            },
            "amount":[new blockChainThriftModel.Coin({denom: denom,amount: amtV})],
            "fee":new blockChainThriftModel.Fee({denom: denom,amount: feeAmtV}),
            "type":Irisnet.Constants.IRIS.TxType.DELEGATE,
            "memo":new blockChainThriftModel.Memo({id:1,text:memo})
        });
        tx.gas = gas;

        let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
        let stdTx = builder.buildAndSignTx(tx,priKey);
        console.log(JSON.stringify(stdTx.GetPostData()));

        let result = stdTx.Hash();
        console.log("marshal bytes",JSON.stringify(result.data));
        console.log("tx hash",result.hash);
    })
});