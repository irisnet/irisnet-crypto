## 1.0.3

*July 19, 2018*

IMPROVEMENTS

- [chain] Add `chains` package for constructing transaction messages for various chains and signing transactions. Currently support `ethermint` and `irishub` chains (all adopt Cosmos-sdk as a base chain can be used)
- [test] Add unit test package
- [util] Add accessory kit
- `crypto.js` is the entry for the relevant account operations of the chain, and the builder is the entry for constructing and signing transactions.
- `constants.js` provides `irisnet-crypto` related constants

