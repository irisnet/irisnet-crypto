let Sha256 = require("sha256");
let Hex = require("../hex");
let Nacl = require("tweetnacl");

GenSeedEd25519FromSecret = function (secret) {
    let privKey32 = Sha256(secret);
    privKey32 = Hex.hexToBytes(privKey32);
    return privKey32;
};

Sign = function(private_key,msg){
    let msgHex = Hex.stringToHex(JSON.stringify(msg))
    let sigByte = Hex.hexToBytes(msgHex)
    let msgArr = new Uint8Array(sigByte)
    let prikeyArr = new Uint8Array(Hex.hexToBytes(private_key))
    let sig = Nacl.sign.detached(msgArr,prikeyArr)
    return Hex.hexToBytes(Hex.bytesToHex(sig))
}

module.exports = {
    GenSeedEd25519FromSecret: GenSeedEd25519FromSecret,
    Sign: Sign
};
