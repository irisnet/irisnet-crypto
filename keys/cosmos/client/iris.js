'use strict';
const request = require('axios');
const old = require('old');

const Bank = require("../x/bank");
const Stake = require("../x/stake");
const Bech32 = require('Bech32');
const Hex = require("../../hex");

class Client {
    constructor(lcdEndpoint,chainId){
        this.lcdEndpoint = lcdEndpoint;
        this.chainId = chainId;
        this.urls = {
            "QueryAccount" :this.lcdEndpoint + "/accounts/",
            "Transfer" :this.lcdEndpoint + "/tx/send",
            "Validators" :this.lcdEndpoint + "/stake/validators"
        };
    }

    async req(method, path, data) {
        try {
            let res = await request({
                method,
                url: path,
                data
            });
            return res.data
        } catch (resError) {
            let resp = resError.response;
            if (!resp) throw resError;
            // server responded with error message, create an Error from that
            let error = Error(resp.data);
            error.code = resp.status;
            throw error
        }
    }
}

Object.assign(Client.prototype, {
    QueryAccount : function (address) {
        return new Promise((resolve, reject) => {
            let addrByte = Bech32.toWords(Buffer.from(address, 'hex'));
            let Bech32Acc = Bech32.encode("cosmosaccaddr",addrByte);
            let url = this.urls.QueryAccount + Bech32Acc;
            this.req("GET", url).then(result => resolve(result))
        })

    },
    Transfer : function (fromAcc,toAddress, amts,fees,gas) {
        return new Promise((resolve, reject) => {
            //①查询账户信息(获取seq.accNum)
            //②构造交易内容
            //③交易签名
            //④发送交易
            this.QueryAccount(fromAcc.address).then((acc) => {
                let account = acc.value;
                account.chain_id = this.chainId;
                account.address = fromAcc.address;
                account.public_key = fromAcc.publicKey;
                account.private_key = fromAcc.privateKey;
                return account;
            }).then(account => {
                let url = this.urls.Transfer;
                let tx = Bank.BuildAndSignTx(account,toAddress,amts,fees,gas);
                this.req("POST", url,JSON.stringify(tx)).then(result => resolve(result))
            })
        })
    },
    Delegate : function (fromAcc,validatorAddr, amts,fees,gas) {
        return new Promise((resolve, reject) => {
            //①查询账户信息(获取seq.accNum)
            //②构造交易内容
            //③交易签名
            //④发送交易
            this.QueryAccount(fromAcc.address).then((acc) => {
                let account = acc.value;
                account.chain_id = this.chainId;
                account.address = fromAcc.address;
                account.public_key = fromAcc.publicKey;
                account.private_key = fromAcc.privateKey;
                return account;
            }).then(account => {
                let url = this.urls.Transfer;
                let tx = Stake.Delegate(account,validatorAddr,amts,fees,gas);
                this.req("POST", url,JSON.stringify(tx)).then(result => resolve(result))
            })
        })
    },
    Unbond : function (fromAcc,validatorAddr, shares,fees,gas) {
        return new Promise((resolve, reject) => {
            //①查询账户信息(获取seq.accNum)
            //②构造交易内容
            //③交易签名
            //④发送交易
            this.QueryAccount(fromAcc.address).then((acc) => {
                let account = acc.value;
                account.chain_id = this.chainId;
                account.address = fromAcc.address;
                account.public_key = fromAcc.publicKey;
                account.private_key = fromAcc.privateKey;
                return account;
            }).then(account => {
                let url = this.urls.Transfer;
                let tx = Stake.Unbond(account,validatorAddr,shares,fees,gas);
                this.req("POST", url,JSON.stringify(tx)).then(result => resolve(result))
            })
        })
    },
    Validators : function () {
        return new Promise((resolve, reject) => {
            let url = this.urls.Validators;
            this.req("GET", url).then(result => {
                result.forEach(function (item,index) {
                    let ownKey = Bech32.decode(item.owner);
                    item.owner = Hex.bytesToHex(Bech32.fromWords(ownKey.words)).toUpperCase();

                    let pukKey = Bech32.decode(item.pub_key);
                    item.pub_key = Hex.bytesToHex(Bech32.fromWords(pukKey.words)).toUpperCase()
                });
                resolve(result)
            })
        })
    }

});

module.exports = old(Client);