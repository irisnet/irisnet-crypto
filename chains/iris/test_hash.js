const Irisnet = require('../../index');
const chai = require('chai');
const assert = chai.assert;


const lcdServer ="http://irisnet-lcd.dev.rainbow.one";

describe('CryPto iris test', function () {

    let chain_id = "rainbow-dev";

    it('test transfer hash', function () {
        let crypto = Irisnet.getCrypto('iris', 'testnet');
        let account1 = crypto.create();
        let sequence = 1;
        let base = 1000000000000000000;
        for (let i = 1; i <= 100; i++) {
            console.log(i);
            let account2 = crypto.create();
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: sequence,
                fees: {denom: "iris-atto", amount: 100000000000000000},
                gas: 10000,
                memo: randomWord(100),
                type: Irisnet.config.iris.tx.transfer.type,
                msg: {
                    to: account2.address,
                    coins: [
                        {
                            denom: "iris-atto",
                            amount: base * Math.pow(10,i)
                        }
                    ]
                }
            };
            execute(tx,account1.privateKey);
            sequence++;
        }
    });

    it('test delegate hash', function () {
        let crypto = Irisnet.getCrypto('iris', 'testnet');
        let account1 = crypto.create();
        let sequence = 1;
        let base = 1000000000000000000;
        for (let i = 1; i <= 100; i++) {
            console.log(i);
            let account2 = crypto.create();
            let tx = {
                chain_id: chain_id,
                from: account1.address,
                account_number: 0,
                sequence: sequence,
                fees: {denom: "iris-atto", amount: 100000000000000000},
                gas: 10000,
                memo: randomWord(100),
                type: Irisnet.config.iris.tx.delegate.type,
                msg: {
                    validator_addr: "fva1aake3umjllpd9es5d3qmry4egcne0f8ajd7vdp",
                    delegation: {
                        denom: "iris-atto",
                        amount: 1000000000000000000000000
                    }
                }
            };
            execute(tx,account1.privateKey);
            sequence++;
        }
    });
});

function randomWord(range) {
    let str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

function execute(tx,privateKey,chain = 'iris') {
    let builder = Irisnet.getBuilder(chain,'testnet');
    let stdTx = builder.buildAndSignTx(tx, privateKey);
    let exp = stdTx.Hash();
    let payload = stdTx.GetData();
    let url = lcdServer + "/tx/broadcast";
    let response = sendHttpRequest("POST",url,payload);
    assert.strictEqual(response.hash,exp.hash,JSON.stringify(payload))
}

function sendHttpRequest(method,url, payload) {
    let req = require('sync-request');
    let res = req(method, url, {
        json: payload,
    });
    return JSON.parse(res.getBody('utf8'))
}
