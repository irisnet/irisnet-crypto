'use strict'
const request = require('axios')
const old = require('old')

const Bank = require("../x/bank");
const bech32 = require('bech32');

class Client {
    constructor(lcdEndpoint,chainId){
        this.lcdEndpoint = lcdEndpoint;
        this.chainId = chainId;
        this.urls = {
            "QueryAccount" :this.lcdEndpoint + "/accounts/",
            "Transfer" :this.lcdEndpoint + "/tx/send"
        };
    }

    async req(method, path, data) {
        try {
            let res = await request({
                method,
                url: path,
                data
            })
            return res.data
        } catch (resError) {
            let resp = resError.response
            if (!resp) throw resError
            // server responded with error message, create an Error from that
            let error = Error(resp.data)
            error.code = resp.status
            throw error
        }
    }
}

Object.assign(Client.prototype, {
    QueryAccount : function (address) {
        let client = this;
        return new Promise(function (resolve, reject){
            let addrByte = bech32.toWords(Buffer.from(address, 'hex'))
            let bech32Acc = bech32.encode("cosmosaccaddr",addrByte)
            let url = client.urls.QueryAccount + bech32Acc;
            client.req("GET", url).then(result => resolve(result))
        })

    },
    Transfer : function (fromAcc,toAddress, amts,fees,gas) {
        let client = this;
        return new Promise(function (resolve, reject){
            //①查询账户信息(获取seq.accNum)
            //②构造交易内容
            //③交易签名
            //④发送交易
            client.QueryAccount(fromAcc.address).then(function (acc) {
                let account = acc.value;
                account.chain_id = client.chainId;
                account.address = fromAcc.address
                account.public_key = fromAcc.publicKey
                account.private_key = fromAcc.privateKey
                return account;
            }).then(account => {
                let url = client.urls.Transfer;
                let tx = Bank.BuildTx(account,toAddress,amts,fees,gas)
                client.req("POST", url,JSON.stringify(tx)).then(result => resolve(result))
            })
        })
    }

})

module.exports = old(Client)