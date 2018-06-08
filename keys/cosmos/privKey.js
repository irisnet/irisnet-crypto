'use strict'
let Sha256 = require("sha256");
let Hex = require("../hex");
let GenSeedEd25519FromSecret = function (secret) {
    let privKey32 = Sha256(secret);
    privKey32 = Hex.hexToBytes(privKey32);
    return privKey32;
};

module.exports = {
    GenSeedEd25519FromSecret: GenSeedEd25519FromSecret
};
