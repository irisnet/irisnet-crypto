const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;

describe('CryPto test', function () {
    describe('irisnet-crypto', function () {
        it('test create and recover', function () {
            let crypto = Irisnet.getCrypto(Irisnet.Constants.COMM.Chains.IRIS);
            let keyPair = crypto.create(Irisnet.Constants.COMM.Language.EN);
            console.log(JSON.stringify(keyPair));
            let keyPair2 = crypto.recover(keyPair.phrase,Irisnet.Constants.COMM.Language.EN);
            assert.deepEqual(keyPair, keyPair2);
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
            let account = crypto.recover("tube lonely pause spring gym veteran know want grid tired taxi such same mesh charge orient bracket ozone concert once good quick dry boss");
            console.log(account)
            // assert.deepEqual(account, {
            //         address: 'faa1cmjnj9zw0m4aau95dsmzj7zgaqagptzywu3v8r',
            //         phrase: 'beach paddle tray erupt soup powder fortune essence suit quality autumn cotton bubble direct cash route blast cabin wool ranch boring depart lemon hat',
            //         privateKey: '60F95C4585E42E41EE50F2C6CCAA1BBD6A9254602C4F5C934DCB5AAA28DD2FE0',
            //         publicKey: 'fap1addwnpepqd3kns6jqsanqjprvxnsj3rhmxfr9607mmy49ypg24p22f57pp446n0sz6v'
            //     }
            // );
        });

        it('test buildTx and signTx', function () {
            let tx = {
                chain_id: "rainbow-dev",
                from: "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm",
                account_number: 4,
                sequence:14 ,
                fees: {
                    denom: "iris-atto",
                    amount:400000000000000000
                },
                gas: 200000,
                memo: "",
                type: Irisnet.Constants.IRIS.TxType.TRANSFER,
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

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let signMsg = builder.buildTx(tx,"55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175");
            let signStr = JSON.stringify(signMsg.GetSignBytes());
            console.log(signStr);

            let stdTx = builder.signTx(signStr,"55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175")
            console.log(JSON.stringify(stdTx.GetPostData()));
            let result = stdTx.Hash();
            console.log("data:",result.data);
            console.log("hash",result.hash);
        });

        it('test transfer', function () {
            let tx = {
                chain_id: "rainbow-dev",
                from: "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm",
                account_number: 4,
                sequence:16 ,
                fees: {
                    denom: "iris-atto",
                    amount:400000000000000000
                },
                gas: 200000,
                memo: "",
                type: Irisnet.Constants.IRIS.TxType.TRANSFER,
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

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175");
            console.log(JSON.stringify(stdTx.GetPostData()))

            let result = stdTx.Hash();
            console.log("data:",result.data);
            console.log("hash",result.hash);
        });

        it('test delegate', function () {
            let tx = {
                chain_id: "rainbow-dev",
                from: "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm",
                account_number: 4,
                sequence:17 ,
                fees: {
                    denom: "iris-atto",
                    amount:400000000000000000
                },
                gas: 200000,
                memo: "",
                type: Irisnet.Constants.IRIS.TxType.DELEGATE,
                msg: {
                    validator_addr: "fva16h3uazd2wknrae7ql0dqpjw69s5kp44slme6hr",
                    delegation: {
                        denom: "iris-atto",
                        amount:10000000000000000000
                    }
                }
            };

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175");
            console.log(JSON.stringify(stdTx.GetPostData()));

            let result = stdTx.Hash();
            console.log("data:",result.data);
            console.log("hash",result.hash);
        });

        it('test BeginUnbonding', function () {
            let tx = {
                chain_id: "rainbow-dev",
                from: "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm",
                account_number: 4,
                sequence:18 ,
                fees: {
                    denom: "iris-atto",
                    amount:400000000000000000
                },
                gas: 200000,
                memo: "",
                type: Irisnet.Constants.IRIS.TxType.BEGINUNBOND,
                msg: {
                    validator_addr: "fva16h3uazd2wknrae7ql0dqpjw69s5kp44slme6hr",
                    shares_amount:"10000000000000000000"
                }
            };

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175");
            console.log(JSON.stringify(stdTx.GetPostData()))

            let result = stdTx.Hash();
            console.log("data:",result.data);
            console.log("hash",result.hash);
        });

        it('test BeginRedelegate', function () {
            let tx = {
                chain_id: "rainbow-dev",
                from: "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm",
                account_number: 4,
                sequence:20 ,
                fees: {
                    denom: "iris-atto",
                    amount:400000000000000000
                },
                gas: 200000,
                memo: "",
                type: Irisnet.Constants.IRIS.TxType.BEGINREdELEGATE,
                msg: {
                    validator_src_addr: "fva1cr6xfpp078nm7yfsh36850ftu20fl3c9duchrk",
                    validator_dst_addr: "fva1xde0yh9vmc8mnkdvdr5krllfe3gslw9d4qp2wd",
                    shares_amount:10000000000000000000
                }
            };

            let builder = Irisnet.getBuilder(Irisnet.Constants.COMM.Chains.IRIS);
            let stdTx = builder.buildAndSignTx(tx,"55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175");
            console.log(JSON.stringify(stdTx.GetPostData()))

            let result = stdTx.Hash();
            console.log("data:",result.data);
            console.log("hash",result.hash);
        });
    });
});