const Crypto = require("./crypto");
const Builder = require("./builder").Builder;

function getBuilder(chainName){
    return Builder.getBuilder(chainName)
}

function getCrypto(chainName){
    return Crypto.getCrypto(chainName)
}

class Constants{}
Constants.COMM = require("./constants");
Constants.IRIS = require("./chains/iris/constants");
Constants.ETHERMINT = require("./chains/ethermint/constants");

module.exports = {getCrypto,getBuilder,Constants};