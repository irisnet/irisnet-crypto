const Crypto = require("./crypto");
const Builder = require("./builder").Builder;
const config = require('./config');

function getBuilder(chainName){
    return Builder.getBuilder(chainName)
}

function getCrypto(chainName){
    return Crypto.getCrypto(chainName)
}

module.exports = {getCrypto,getBuilder,config};