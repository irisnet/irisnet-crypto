let gaia = require("./gaia");
const MODEL = require("./model");

let from = "test"

let account = new MODEL.Account("cool", "1111111111", "A956C5702E8657F53C3D1E73F3DA29939F4D11DE","","","olympic oblige poet hybrid exhaust siren olympic patch motion shaft antenna debate era family achieve above");
let client = new gaia.Client(account, "http://192.168.150.118:8998", "http://192.168.150.118:46657");


let to = "0C1B32ADFA62415EE293875B6CEDF2389DC46283";
let amts = [new MODEL.Coin(10, "fermion")];
let fee = new MODEL.Coin(1, "fermion");

client.setDevMode();

//转账
function test_transfer() {
    client.transfer(to, amts,fee, function (tx) {
        console.log("转账结果:=========================");
        console.log(JSON.stringify(tx));

        client.queryAccount(to, function (info) {
            console.log("查询余额:=========================");
            console.log(JSON.stringify(info));
        })


        var hash = tx.hash;
        client.queryTx(hash, function (tx) {
            console.log("查询交易:=========================");
            console.log(JSON.stringify(tx));
        })

        var height = tx.height;
        client.queryBlock(height, function (tx) {
            console.log("查询区块:=========================");
            console.log(JSON.stringify(tx));
        })
    },function (err) {
        console.log(err);
        console.log(err.code);
        console.log(err.message);
    })
}

//生成账户
function test_generateKey() {
    let key = new client.Key();
    key.generate("test", "1111111111", function (result) {
        console.log(JSON.stringify(result));
    }, function (err) {
        console.log(err.code);
        console.log(err.message);
    })
}

//查询用户信息
function test_queryKey() {
    let key = new client.Key();
    key.query("hot5", function (result) {
        console.log(JSON.stringify(result));
    }, function (err) {
        console.log(err.code);
        console.log(err.message);
    })
}
//恢复账户
function test_recoverKey() {
    let account = new MODEL.Account("hot5", "1234567890", "", "","","silver jungle scissors theme gain vendor one trust jump verb wrap picture fog food question about");
    let key = new client.Key();
    key.recover(account, function (result) {
        console.log(JSON.stringify(result));
    }, function (err) {
        console.log(err.code);
        console.log(err.message);
    })
}

function test_queryValidators() {
    client.queryValidators(null,function (list) {
        console.log(JSON.stringify(list));
    },function (err) {
        console.log(err.code);
        console.log(err.message);
    })
}

test_transfer();

//test_generateKey();

//test_queryKey()

//test_recoverKey()

//test_queryValidators()
