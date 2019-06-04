
const Irisnet = require('../index');
const chai = require('chai');
const assert = chai.assert;
const fetch = require('isomorphic-fetch');

const config = {
  iris:{
      host : "http://irisnet-lcd.dev.rainbow.one",
      chainId:"",
  },
  cosmos:{

  }
};

function randomWord(range) {
    let str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

function randomHex(range){
    let str = "",
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str.toUpperCase();
}

function verifyTx(url, tx, privateKey, chainName,callback) {
    let builder = Irisnet.getBuilder(chainName,"testnet");
    let stdTx = builder.buildAndSignTx(tx, privateKey);
    let exp = stdTx.Hash();
    let payload = stdTx.GetData();
    sendByAsync("POST",url,payload).then(response => {
        callback(response,exp,payload);
    }).catch(e =>{
        console.log(`lcd request failed`,e)
    });

}

function verifyAccount(url, account){
    let payload = {
        password: "1234567890",
        seed: account.phrase
    };
    sendByAsync("POST",url,payload).then(response => {
        assert.strictEqual(response.address,account.address);
        assert.strictEqual(response.pub_key,account.publicKey)
    }).catch(e =>{
        console.log(`lcd request failed`,e)
    });
}

function sendBySync(method,url,payload) {
    let req = require('sync-request');
    let res = req(method, url, {
        json: payload,
    });
    return JSON.parse(res.getBody('utf8'))
}

function getSequence(host,address) {
    let url = `${host}/auth/accounts/${address}`;
    let res = sendBySync("GET", url);
    let account = res.value;
    return account.sequence
}

function sendByAsync(method,url,data){
    let payload = {
        method: method,
        body: JSON.stringify(data)
    };
    return fetch(url, payload).then(response => {
        if (!response.ok) {
            return Promise.reject(response.text().then(msg => {
                return msg;
            }))
        }
        let contentType = response.headers.get('content-type');
        let result = '';
        if (contentType.includes('text/plain')) {
            result = response.text();
        } else if (contentType.includes('application/json')) {
            result = response.json();
        }
        return result;
    }).catch(err => {
        return Promise.reject(err)
    })
}

module.exports = {randomWord,randomHex,verifyTx,verifyAccount,sendBySync,getSequence};