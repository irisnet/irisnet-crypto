'use strict'
let Holder = require("./holder");
Holder.Init(
    {
        "gaia":'http://116.62.62.39:8999',
        "tendermint":"http://116.62.62.39:46657",
        "ethermint":"http://116.62.62.39:8546"
    })
Holder.Validators('cosmos').then(data=>{
    console.log(data);
})
// Holder.Init(
//     {
//         "gaia":'http://192.168.150.111:8999',
//         "tendermint":"http://192.168.150.138:8080/tendermint",
//         "ethermint":"http://192.168.150.125:8555"
//     }
// )
// Holder.Sign('cosmos',{
//     "from":"BD565DB9437703ED758DEFA980137EF8A1F6BA65",
//     "to":"899E4970EC7F10756216AFBA13D7701E1B3EA77E",
//     "count":1,
//     "fees":1,
//     'type':'delegate'
// },'76bd033ead9e62ba05609973bcd43952befacde84923ef22bcb6464bb377cdf91222d44f4c01f1929c7f02962d0615428121b202cad301a283b95dac1dfe034d').then(pass=>{
//     console.log(pass);
// });
Holder.Sign('cosmos',{
    "pub_key":{
        "type": "ed25519",
        "data": "F0D13CDE664C993357EE8054AC16FBAA885B66915D0BC2CDADA289E92F4500E4"
    },
    "to":"899E4970EC7F10756216AFBA13D7701E1B3EA77E",
    "count":1,
    "fees":1,
    'type':'delegate'
},'76bd033ead9e62ba05609973bcd43952befacde84923ef22bcb6464bb377cdf91222d44f4c01f1929c7f02962d0615428121b202cad301a283b95dac1dfe034d').then(pass=>{
    console.log(pass);
});

// Holder.Sign('cosmos',{
//     "from":"BD565DB9437703ED758DEFA980137EF8A1F6BA65",
//     "to":"B28E12F4FF26975410C1823FEB5AAEC47F0D4DB6",
//     "count":1,
//     "fees":1,
// },'76bd033ead9e62ba05609973bcd43952befacde84923ef22bcb6464bb377cdf91222d44f4c01f1929c7f02962d0615428121b202cad301a283b95dac1dfe034d').then(pass=>{
//     console.log(pass);
// });
// Holder.Sign('cosmos',{
//     "name":"test27",
//     "password":"1234567890",
//     "addr":"6AC5923496976B8479BC7006D76EA2EA17182AEA",
//     "to":"A956C5702E8657F53C3D1E73F3DA29939F4D11DE",
//     "count":10,
//     "fees":1
// },'').then(pass=>{
//     console.log(pass);
// })
// Holder.Balance('cosmos','6AC5923496976B8479BC7006D76EA2EA17182AEA').then(i=>{
//     return i;
// }).catch(errer=>{
//     return 0
// }).then(i=>{
//     console.log(i);
// })

// Holder.Sign('ethermint',{
//     "count":100,
//     "fees":0.000661,
//     "to":"0x40a64d1f14b9ea3b7d6f992152e1bd57b621e888",
// },'a70e42ae400bd5525cc2d2a9564b0710640acf981322e9682819d9e06a6fac4d').then(tx=>{
//
//     console.log(tx);
// })


// Holder.Balance('ethermint','0x40a64d1f14b9ea3b7d6f992152e1bd57b621e889').then(i=>{
//     console.log(i);
// })
// Holder.Create("cosmos",{
//     name:"test9",
//     password:"1234567890"
// }).then(account=>{
//     console.log(account,'222');
// })

// { address: '38B4D68F43404F0B12BB7F3451310BA3EF477E6F',
//     phrase: 'sadness flower rack gas tumble casual creek shrimp broom breeze want brown frog gasp welcome ability',
//     privateKey: '',
//     publicKey: '54F4023B9627C97AE2232135FA74CF34657F03B5F30029D293973EACC43AF961'
// }

// let account = Holder.Create("cosmos", "ed25519", "english");
// if (account) {
//     let recoverAccount = Holder.Recover("cosmos", account.phrase, "english");
//     let importAccount  = Holder.Import("cosmos",account.privateKey);
//     console.log(account);
//     console.log(recoverAccount);
//     console.log(importAccount);
// }




