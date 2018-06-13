const Nacl = require("tweetnacl");
const Encoding = require("text-encoding");
const chai = require('chai');
const assert = chai.assert;

describe('crypto test', function () {
    it('ed25519 test', function () {
        //sign
        let key = Nacl.sign.keyPair();
        let msg = "my first message";
        let signMsg = Nacl.sign.detached(new Encoding.TextEncoder().encode(msg), key.secretKey);
        let e = Nacl.sign.detached.verify(new Encoding.TextEncoder().encode(msg), signMsg, key.publicKey);
        assert.deepEqual(e, true);
    });
});


