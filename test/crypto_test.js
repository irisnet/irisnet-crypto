const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;
const blockChainThriftModel = require("irisnet-rpc/common/codegen/gen-nodejs/model_types");
const Codec = require("../util/codec");
const Amino = require('./amino_js');
const root = require('./tx');

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
            //console.log(Codec.Bech32.fromBech32("faa1cmjnj9zw0m4aau95dsmzj7zgaqagptzwu3v8r"));
            console.log(Codec.Bech32.toBech32("faa","8698502387267CD39EB03D824CEAA6D68539B507"));
        });

        it('test import', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let account = crypto.import("B96DBE9629CF64AEE0F568B7875E35121016E2BBDCF07CF51768880E00549B87")
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
            let account = crypto.recover("coconut pistol mushroom grocery razor tenant crumble trial ocean deny prosper fury put educate flush beef eager spoil mix insane divert obvious fresh puzzle");
            console.log(account)
            // assert.deepEqual(account, {
            //         address: 'faa1cmjnj9zw0m4aau95dsmzj7zgaqagptzywu3v8r',
            //         phrase: 'beach paddle tray erupt soup powder fortune essence suit quality autumn cotton bubble direct cash route blast cabin wool ranch boring depart lemon hat',
            //         privateKey: '60F95C4585E42E41EE50F2C6CCAA1BBD6A9254602C4F5C934DCB5AAA28DD2FE0',
            //         publicKey: 'fap1addwnpepqd3kns6jqsanqjprvxnsj3rhmxfr9607mmy49ypg24p22f57pp446n0sz6v'
            //     }
            // );
        });

        it('test transfer', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":0,
                "ext":0,
                "sender":{
                    "chain":"fuxi-4000",
                    "app":"v0.2.0",
                    "addr":"faa14q3lumvq32jwk0zu4plslarqefj5vzdeleraes"
                },
                "receiver":{
                    "chain":"fuxi-1001",
                    "app":"v0.2.0",
                    "addr":"faa1s6v9qgu8ye7d884s8kpye64x66znndg8t6eztj"
                },
                "amount":[new blockChainThriftModel.Coin({denom: "iris-atto",amount: 10000000000000000000})],
                "fee":new blockChainThriftModel.Fee({denom: "iris-atto",amount: 4000000000000000}),
                "type":Irisnet.Constants.IRIS.TxType.TRANSFER,
                "memo":new blockChainThriftModel.Memo({id:1,text:"test"})
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"B96DBE9629CF64AEE0F568B7875E35121016E2BBDCF07CF51768880E00549B87");
            console.log(JSON.stringify(stdTx))
            //TODO 将stdTx提交到iris-hub[/tx/send]
        });

        //冷钱包
        it('test buildTx and signTx', function () {
            let tx = new blockChainThriftModel.Tx({
                "sequence":5,
                "ext":0,
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
                "type":Irisnet.Constants.IRIS.TxType.TRANSFER
            });

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let signMsg = builder.buildTx(tx);
            let stdTx = builder.signTx(signMsg,"8789EB2C2510D8D236EB85DAEFE4E1A4EA7D8E6929E0A1400FCF2848CF7F2DA4");
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

        it('test isValidAddress', function () {
            let addr = "faa1a89us8tvt3d9qpq7j6e06dc3z88n576shj8k2h";
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let result = crypto.isValidAddress(addr);
            assert.isTrue(result);
        });

        it('test create Tx Hash', function () {

            let Coin = root.irisnet.tx.Coin;
            let amount = Coin.create({denom:"iris",amount:"100"});
            let buffer = Coin.encode(amount).finish();
            console.log("Coin",JSON.stringify(buffer));

            let Input = root.irisnet.tx.Input;
            let addrHex = Codec.Hex.stringToHex("faa14q3lumvq32jwk0zu4plslarqefj5vzdeleraes");
            let addr = Codec.Hex.hexToBytes(addrHex);
            let inputMsg = Input.create({"address":addr,"coins":[amount]});

            let inputBuf = Input.encode(inputMsg).finish();
            console.log("Input",JSON.stringify(inputBuf));

            let Output = root.irisnet.tx.Output;
            let outputMsg = Output.create({"address":addr,"coins":[amount]});

            let outputBuf = Output.encode(inputMsg).finish();
            console.log("Output",JSON.stringify(outputBuf));

            let MsgSend = root.irisnet.tx.MsgSend;
            let sendMsg = MsgSend.create({"input":[inputMsg],"output":[outputMsg]});
            let sendMsgBuf = MsgSend.encode(sendMsg).finish();
            console.log("MsgSend",JSON.stringify(sendMsgBuf));

            let StdFee = root.irisnet.tx.StdFee;
            let feeMsg = StdFee.create({"amount":[amount],"gas":1000});
            let feeMsgBuf = StdFee.encode(feeMsg).finish();
            console.log("StdFee",JSON.stringify(feeMsgBuf));

            let StdSignature = root.irisnet.tx.StdSignature;
            let sigMsg = StdSignature.create({"pubKey":[235, 90, 233, 135, 33, 3, 3, 159, 131, 72, 145, 25, 231, 22, 110, 146, 139, 166, 121, 134, 69, 25, 180, 92, 143, 21, 236, 84, 31, 176, 201, 54, 207, 212, 43, 135, 23, 242],"signature":[1,2,3,5,6],"accountNumber":1,"sequence":1});
            let sigMsgBuf = StdSignature.encode(sigMsg).finish();
            console.log("StdSignature",JSON.stringify(sigMsgBuf));

            let StdTx = root.irisnet.tx.StdTx;
            let txMsg = StdTx.create({"msgs":[sendMsg],"fee":feeMsg,"signatures":[sigMsg],"memo":"hello"});
            let txMsgBuf = StdTx.encode(txMsg).finish();
            console.log("StdTx",JSON.stringify(txMsgBuf));

            //let tx1 = Amino.amino.MarshalBinary(txMsg);
            //console.log(JSON.stringify(tx1));

            //stdTx amion编码前缀
            let txPreBuf = Buffer.from([240,98,93,238]);
            //msg amion编码前缀
            let msgPreBuf = Buffer.from([42,44,135,250]);

            let buf = Buffer.alloc(txPreBuf.length + msgPreBuf.length + txMsgBuf.length,0);
            let offset = 0;

            buf.fill(txPreBuf,offset);
            offset += txPreBuf.length;

            buf.fill(txMsgBuf[0],offset);
            offset += 1;

            buf.fill(msgPreBuf.length+txMsgBuf[1],offset);
            offset += 1;

            buf.fill(msgPreBuf,offset);
            offset += msgPreBuf.length;

            buf.fill(txMsgBuf.slice(2),offset);



            let uvarintBuf = Buffer.from(EncodeUvarint(buf.length));
            let bz = Buffer.concat([uvarintBuf,buf]);
            console.log(JSON.stringify(bz));

            const crypto = require('crypto');
            const hash = crypto.createHash('sha256');
            hash.update(bz);
            let hashTx =hash.digest('hex').substring(0,40);
            console.log(hashTx.toUpperCase());

        });

        it('test std_tx MarshalBinary', function () {

        })

    });
});

function EncodeUvarint(u) {
    let buf = Buffer.alloc(10);
    let i = 0;
    const BN = require("bn");
    while (u >= 0x80) {
        buf[i] = new BN(u).or(new BN(0x80));
        u >>= 7;
        i++ ;
    }
    buf[i] = new BN(u);
    return buf.slice(0,2);
}