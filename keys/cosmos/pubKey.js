let RIPEMD160 = require('ripemd160');
let Hex = require("../hex");
const sha256 = require('sha256');
Address_Ed25519 = function (pubKey, type) {

    let prefix = nameToPrefix("tendermint/PubKeyEd25519");
    prefix = prefix.concat(pubKey.length);
    let encodeBytes = prefix.concat(Array.from(pubKey));
    return new RIPEMD160().update(new Buffer(encodeBytes)).digest('hex');
};

module.exports = {
    Address_Ed25519: Address_Ed25519
};

function nameToPrefix(name) {
    let a = sha256(name);
    let b = Hex.hexToBytes(a);
    while (b[0] === 0) {
        b = b.slice(1, b.length - 1)
    }
    b = b.slice(3, b.length - 1);
    while (b[0] === 0) {
        b = b.slice(1, b.length - 1)
    }
    b = b.slice(0, 4);
    b[3] = b[3] & 0xF8;
    b[3] = b[3] | 2;
    return b


}