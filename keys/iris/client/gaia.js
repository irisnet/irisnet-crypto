const REQUEST = require('axios');
const MODEL = require("./model");
const MODE = {DEV: 1, PRO: 2};

let SDK = require('cosmos-sdk')('')
let config = null;
let MODE_TYPE = MODE.PRO;

let Client = function (account, gaia_addr, ten_addr) {
    config = new MODEL.Config(account, gaia_addr, ten_addr);
    SDK = require('cosmos-sdk')(config.gaia_addr);
}

Client.prototype.setProMode = function () {
    MODE_TYPE = MODE.PRO;
}

Client.prototype.setDevMode = function () {
    MODE_TYPE = MODE.DEV;
}


//转账
Client.prototype.transfer = function (to, amts,fees,suc, fail) {

    let account = config.account;

    //获取交易序号
    SDK.queryNonce(account.addr).then(function (result) {
        let nonce = 1;
        if (!isNaN(result.data)) {
            nonce = result.data + 1;
        }
        return nonce;
    }).catch(function (err) {
        return 1;
    }).then(nonce=>{
        let From = new MODEL.Actor("", "sigs", account.addr);
        let To = new MODEL.Actor("", "sigs", to);
        //构建交易
        let sendTnput = new MODEL.SendTnput(From, To, amts, nonce,fees);
        SDK.buildSend(sendTnput).then(function (tx) {
            log("构造交易START==============")
            log(tx);
            log("构造交易END==============")

            if (MODE_TYPE == MODE.DEV) {
                var sigTx = {tx, name: account.name, password: account.password};
                log("签名交易==============")
                log(sigTx);
                log("签名交易==============")
                SDK.sign(sigTx).then(function (signTx) {
                    log(signTx);
                    //提交交易
                    SDK.postTx(signTx).then(function (result) {
                        if(result.height > 0){
                            callBack(suc,result,true);
                        }else {
                            callBack(fail,result);
                        }

                    }).catch(function (err) {
                        log("postTx error");
                        callBack(fail,err);
                    })
                }).catch(function (err) {
                    log("sign error");
                    callBack(fail,err);
                })
            } else {
                //签名交易
                let unwrapTx = tx.data.tx;
                tx.data.signature = account.sign(unwrapTx);
                log("签名数据START==============")
                log(tx);
                log("签名数据END==============")

                //提交交易
                SDK.postTx(tx).then(function (result) {
                    if(result.height > 0){
                        callBack(suc,result,true);
                    }else {
                        callBack(fail,result);
                    }
                }).catch(function (err) {
                    callBack(fail,err);
                })
            }
        })
            .catch(function (err) {
                log("buildSend error");
                callBack(fail,err);
            })
    })
}

Client.prototype.queryAccount = function (account, suc, fail) {

    SDK.queryAccount(account).then(function (result) {
        callBack(suc,result,true);
    }).catch(function (err) {
        log("queryAccount error");
        callBack(fail,err);
    });
}

Client.prototype.queryTx = function (hash, suc, fail) {

    let url = config.ten_addr + "/tx?hash=" + preHex(hash);
    req("GET", url).then(function (tx) {
        callBack(suc,tx,true);
    }).catch(function (err) {
        log("queryTx error");
        callBack(fail,err);
    })
}
Client.prototype.queryBlock = function (height, suc, fail) {

    let url = config.ten_addr + "/block?height=" + height;
    req("GET", url).then(function (block) {
        callBack(suc,block,true);
    }).catch(function (err) {
        log("queryBlock error");
        callBack(fail,err);
    })

}

Client.prototype.queryValidators = function (height, suc, fail) {

    let url = config.ten_addr + "/validators";
    if(height > 0){
        url = config.ten_addr + "/validators?height=" + height;
    }

    req("GET", url).then(function (validators) {
        callBack(suc,validators,true);
    }).catch(function (err) {
        log("queryValidators error");
        callBack(fail,err);
    })
}

Client.prototype.Key = function () {
    return new Key();
}
class Key {
    //生成账户
    generate(name,password, suc, fail) {

        let account = new MODEL.Account(name, password);
        if (MODE_TYPE == MODE.DEV) {
            SDK.generateKey(account).then(function (result) {
                var addr = result.key.address,
                    pubkey = result.key.pubkey.data,
                    seed_phrase = result.seed_phrase;
                var newAcc = new MODEL.Account(name, password,addr,pubkey,"",seed_phrase);
                callBack(suc,newAcc,true);
            }).catch(function (err) {
                log("generateKey error");
                callBack(fail,err);
            })
        } else {
            //TODO
        }
    }

    //查询Key
    query(key, suc, fail) {

        if (MODE_TYPE == MODE.DEV) {
            SDK.getKey(key).then(function (result) {
                callBack(suc,result,true);
            }).catch(function (err) {
                log("queryKey error");
                callBack(fail,err);
            })
        } else {
            //TODO
        }
    }

    recover(account, suc, fail) {

        if (MODE_TYPE == MODE.DEV) {
            let url = config.gaia_addr + "/keys/recover";
            req("POST", url, account).then(function (result) {
                callBack(suc,result,true);
            }).catch(function (err) {
                log("recoverTx error");
                callBack(fail,err);
            })
        } else {
            //TODO
        }
    }
}

function callBack(fun,args,ischeck) {
    if(ischeck){
        checkFun(fun);
    }
    fun(args);
}

function checkFun(fun) {
    if(! (fun instanceof Function)){
        throw "not a function";
    }
}

function preHex(hash) {
    if (hash.indexOf("0x") > 0) {
        return hash;
    }

    return "0x" + hash;
}

function log(str) {
    if (MODE_TYPE == MODE.DEV) {
        // console.log(JSON.stringify(str));
    }
}

async function req(method, path, data) {
    try {
        let res = await REQUEST({
            method,
            url: path,
            data
        })
        return res.data
    } catch (resError) {
        let data = resError.response.data
        if (!data) throw resError
        // server responded with error message, create an Error from that
        let error = Error(data.error)
        error.code = data.code
        throw error
    }
}


module.exports = {
    Client: Client
};






