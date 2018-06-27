const Wordcodec = require("../common/wordcodec");
const chai = require('chai');
const assert = chai.assert;
const beforeByte = [159, 234, 141, 161, 146, 27, 203, 127, 68, 163, 187, 242, 22, 2, 29, 62, 1];
describe('word codec test', function () {
    it('chinese_simplified', function () {
        let words_c = Wordcodec.BytesToWords(beforeByte, "chinese_simplified");
        let byte_c = Wordcodec.WordsToBytes(words_c, "chinese_simplified");
        assert.deepEqual(beforeByte,byte_c);
    });
    it('japanese', function () {
        let words_j = Wordcodec.BytesToWords(beforeByte, "japanese");
        let byte_j = Wordcodec.WordsToBytes(words_j, "japanese");
        assert.deepEqual(beforeByte,byte_j);
    });
    it('spanish', function () {
        let words_s = Wordcodec.BytesToWords(beforeByte, "spanish");
        let byte_s = Wordcodec.WordsToBytes(words_s, "spanish");
        assert.deepEqual(beforeByte,byte_s);
    });
    it('english', function () {
        let words_e = Wordcodec.BytesToWords(beforeByte, "english");
        let byte_e = Wordcodec.WordsToBytes(words_e, "english");
        assert.deepEqual(beforeByte,byte_e);
    })
});
