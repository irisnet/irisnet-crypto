const Crypto = require("./crypto");
const Builder = require("./builder");
const Constants = require("./common/constants");

function getBuilder(chainName){
    return Builder.getBuilder(chainName)
}

function getCrypto(chainName){
    return Crypto.getCrypto(chainName)
}

module.exports = {getCrypto,getBuilder,Constants};