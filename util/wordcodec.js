let CRC = require("./crc");
let BigNumber = require('bignumber.js');
byteArrayToLong = function (byteArray) {
    console.log(typeof (byteArray[0]));
    let value = 0;
    for (let i = byteArray.length - 1; i >= 0; i--) {
        value = (value * 8) + byteArray[i];
    }
    return value;
};

bytesToLong = function (byteArray) {
    let s = 0;
    let d = new BigNumber(0);
    for (let i = byteArray.length; i > 0; i--) {
        d = d.plus(new BigNumber(byteArray[i - 1]).times(new BigNumber(2).pow(s)));
        s += 8;
    }
    return d;
};

longToBytes = function (long, number) {
    let bytes = new Array(number);
    let s = 8 * (number - 1);
    for (let i = 0; i < number; i++) {
        let b = long.dividedToIntegerBy(new BigNumber(2).pow(s));
        long = long.minus(b.times(new BigNumber(2).pow(s)));
        bytes[i] = parseInt(b);
        s -= 8;
    }
    return bytes;
};

wordlenFromBytes = function (numBytes) {
    // 2048 words per bank, which is 2^11.
    // 8 bits per byte, and we add +10 so it rounds up
    return (8 * numBytes + 10) / 11
};

bytelenFromWords = function (numWords) {
    // calculate the max number of complete bytes we could store in this word
    return (11 * numWords) / 8;
};

//language must be a supported language now: chinese_simplified,japanese,spanish,english(default)
BytesToWords = function (raw, language) {
    let wordArray;
    switch (language) {
        case "chinese_simplified":
            wordArray = require("./wordlist/words").WordsChineseSimplified;
            break;
        case "japanese":
            wordArray = require("./wordlist/words").WordsJapanese;
            break;
        case "spanish":
            wordArray = require("./wordlist/words").WordsSpanish;
            break;
        default:
            wordArray = require("./wordlist/words").WordsEnglish;
    }
    // always add a checksum to the data
    let data = CRC.AddCRC(raw);
    let numWords = parseInt(wordlenFromBytes(data.length));
    const n2048 = 2048;
    let nData = bytesToLong(data);
    let words = [];
    for (let i = 0; i < numWords; i++) {
        let rem = nData.modulo(n2048).toNumber();
        nData = nData.dividedToIntegerBy(n2048);
        words.push(wordArray[rem]);
    }
    return words;
};

//language must be a supported language now: chinese_simplified,japanese,spanish,english(default)
WordsToBytes = function (words, language) {
    if (!words || words.length <= 0) {
        return
    }
    let wordMap = {};
    let wordArray;
    switch (language) {
        case "chinese_simplified":
            wordArray = require("./wordlist/words").WordsChineseSimplified;
            break;
        case "japanese":
            wordArray = require("./wordlist/words").WordsJapanese;
            break;
        case "spanish":
            wordArray = require("./wordlist/words").WordsSpanish;
            break;
        default:
            wordArray = require("./wordlist/words").WordsEnglish;
    }
    for (let i = 0; i < wordArray.length; i++) {
        wordMap[wordArray[i]] = i;
    }
    const n2048 = 2048;
    let nData = new BigNumber(0);
    for (let j = 0; j < words.length; j++) {
        let index = wordMap[words[words.length - 1 - j]];
        let nRem = new BigNumber(index);
        nData = nData.times(n2048);

        nData = nData.plus(nRem);
    }
    let dataBytes = longToBytes(nData, 21);
    return CRC.CheckCRC(dataBytes);
};


module.exports = {
    BytesToWords: BytesToWords,
    WordsToBytes: WordsToBytes
};