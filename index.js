const Crypto = require("./crypto");
const Builder = require("./builder");

function getBuilder(chainName){
    return Builder.getBuilder(chainName)
}

function getCrypto(chainName){
    return Crypto.getCrypto(chainName)
}

class Constants {}
Constants.UTIL = require("./util/constants");
Constants.IRIS = require("./chains/iris/constants");
Constants.ETHERMINT = require("./chains/ethermint/constants");

module.exports = {getCrypto,getBuilder,Constants};