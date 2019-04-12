const Irisnet = require('../../index');
const chai = require('chai');
const util = require('../../util/utils');
const codec = require('../../util/codec');
const assert = chai.assert;


describe('CryPto iris test', function () {

    //测试账户相关信息
    describe('test account', function () {
        it('test create and recover', function () {
            let crypto = Irisnet.getCrypto(Irisnet.config.chain.iris, 'testnet');
            let keyPair = crypto.create(Irisnet.config.language.en);
            console.log(JSON.stringify(keyPair));
            let keyPair2 = crypto.recover(keyPair.phrase, Irisnet.config.language.en);
            assert.deepEqual(keyPair, keyPair2);
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
            let crypto = Irisnet.getCrypto(Irisnet.config.chain.cosmos);
            let account = crypto.recover("");
            console.log(account);
            console.log(codec.Bech32.fromBech32("fap1addwnpepqtdme789cpm8zww058ndlhzpwst3s0mxnhdhu5uyps0wjucaufha6v3ce99"))
        });

        it('test hasRepeatElement', function () {
            let testStr = "detect jealous tumble tumble";
            let result = util.hasRepeatElement(testStr, " ");
            assert.isTrue(result);

            result = util.hasRepeatElement("detect jealous layer", " ");
            assert.isNotTrue(result);

            let arr = ["detect", "jealous", "jealous", "layer"];
            result = util.hasRepeatElement(arr);
            assert.isTrue(result);

            let arr2 = ["detect", "jealous", "layer"];
            result = util.hasRepeatElement(arr2);
            assert.isNotTrue(result);

        });
    });


    let chain_id = "rainbow-dev";
    let from = "faa1ljemm0yznz58qxxs8xyak7fashcfxf5lssn6jm";
    let gas = 200000;
    let account_number = 4;
    let fees = {denom: "iris-atto", amount: 400000000000000000};
    let memo = "1";
    let privateKey = "55A3160577979EC014A2CE85C430E1FF0FF06EFD230B7CE41AEAE2EF00EDF175";
    let pubKey = "fap1addwnpepqtdme789cpm8zww058ndlhzpwst3s0mxnhdhu5uyps0wjucaufha6v3ce99";
    let chain = Irisnet.config.chain.iris;


    it('test transfer', function () {

        // hash 17747A509ED9F1363B559EB8A619766ECB06A7E90FADA4FCAC589E5D393693A9
        // pubkey eb5ae9872102ac8f8789b3c70aefcbd6a2bafca472922d04ed199db53df71586916634873021
        // sign c05fc6d124311878e9ce3d6dca9be670c170f5a6b833eaff86c3830f0749993c4f3f830a68b06f28b743c3f572a947df81b78ffa50e82450064931ce9a515921
        let tx = {
            chain_id: "irishub",
            from: "iaa1wcsa554l5lx99ylu94ujlxuu6jkvacvpp63ajc",
            account_number: 8001,
            sequence: 13,
            fees: {denom: "iris-atto", amount: 100000000000000000},
            gas: 10000,
            memo: "send",
            type: Irisnet.config.iris.tx.transfer.type,
            msg: {
                to: "iaa19tjvsaqvrgkhan9l2pvcl0p2hcf50u2r0pe2fe",
                coins: [
                    {
                        denom: "iris-atto",
                        amount: 5367574370000000000000
                    }
                ]
            }
        };

        // hash 67C771B1597BEA78586C9946E80920591B976677C95EB24157579323951DE168
        // pubkey eb5ae9872102ac8f8789b3c70aefcbd6a2bafca472922d04ed199db53df71586916634873021
        // sign 14bc7cccc95e9b92454d25a1b3b5c2ec9ab7d6d04da8405e3899e69643bf76a12d4206a0e8d9c69e2abd58a662b14815b393061fc6376e75b8cb13dc33285f10
        // let tx = {
        //         chain_id: "irishub",
        //         from: "iaa1wcsa554l5lx99ylu94ujlxuu6jkvacvpp63ajc",
        //         account_number: 8001,
        //         sequence: 3,
        //         fees: {denom: "iris-atto", amount: 100000000000000000},
        //         gas: 10000,
        //         memo: "MaxSon",
        //         type: Irisnet.config.iris.tx.transfer.type,
        //         msg: {
        //             to: "iaa1lsudh3c5sn5xnwv8ewte0qpt4l7c82hh8zquzq",
        //             coins: [
        //                 {
        //                     denom: "iris-atto",
        //                     amount: 94276711700000000000000
        //                 }
        //             ]
        //         }
        //     };

        execute(tx);
    });

    //热钱包调用
    function execute(tx, chain = 'iris') {
        let builder = Irisnet.getBuilder(chain, 'testnet');
        let stdTx = builder.buildAndSignTx(tx, privateKey);
        // console.log("======stdTx======");
        console.log(JSON.stringify(stdTx.GetData()));

        let result = stdTx.Hash();
        //console.log("data:", result.data);
        console.log("hash", result.hash);

        return result.hash
    }

    it('hash transfer', function () {
        let crypto = Irisnet.getCrypto('iris', 'testnet');
        let account1 = crypto.import(privateKey);
        let account2 = crypto.import(privateKey);

        for (let i = 0; i < 1; i++) {
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 8001,
                sequence: 13,
                fees: {denom: "iris-atto", amount: 100000000000000000},
                gas: 10000,
                memo: randomWord(200),
                type: Irisnet.config.iris.tx.transfer.type,
                msg: {
                    to: account2.address,
                    coins: [
                        {
                            denom: "iris-atto",
                            amount: 1475664988324501700
                        }
                    ]
                }
            };
            execute(tx);
        }
    });


    function randomWord(range) {
        var str = "",
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        for (var i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }


    function random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

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
                        amount: 94276711700000000000000
                    }
                ]
            }
        };


        let builder = Irisnet.getBuilder(chain);
        let Codec = require("../../util/codec")
        let signature = {
            pub_key: Codec.Hex.hexToBytes("eb5ae9872102ac8f8789b3c70aefcbd6a2bafca472922d04ed199db53df71586916634873021"),
            signature:Codec.Hex.hexToBytes("14bc7cccc95e9b92454d25a1b3b5c2ec9ab7d6d04da8405e3899e69643bf76a12d4206a0e8d9c69e2abd58a662b14815b393061fc6376e75b8cb13dc33285f10"),
        };
        //①先用联网的钱包构造一笔交易
        let stdTx = builder.buildTx(tx);
        stdTx.SetSignature(signature);
        console.log("stdtx", JSON.stringify(stdTx));
        let result = stdTx.Hash();
        console.log("hash", result.hash);
    });
});