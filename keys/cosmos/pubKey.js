'use strict'
let RIPEMD160 = require('ripemd160');
let TypeEd25519 = 1;
let TypeSecp256k1 = 2;
Address_Ed25519 = function (pubKey,type) {
    //TODO: will be modified in the future, detail view in https://github.com/tendermint/go-crypto/blob/master/pub_key.go
    //we append the algorithm,type byte,pubKey length to the addr to help with recovery
    let encodedPubkey = new Buffer([type, 1, pubKey.length].concat(Array.from(pubKey)));
    return new RIPEMD160().update(encodedPubkey).digest('hex');
};
module.exports = {
    Address_Ed25519: Address_Ed25519
};
