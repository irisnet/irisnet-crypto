const Crypto = require("./crypto");
const Builder = require("./builder").Builder;

function getBuilder(chainName){
    return Builder.getBuilder(chainName)
}

function getCrypto(chainName){
    return Crypto.getCrypto(chainName)
}

module.exports = {getCrypto,getBuilder};