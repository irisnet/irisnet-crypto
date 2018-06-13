'use strict'
let Crc32 = require('js-crc').crc32;

byte = function (b) {
    if (b < 0) {
        return b + 256;
    }
    return b;
};

toUint32 = function (v) {
    let b = [];
    b[0] = byte((v >> 24) % 256);
    b[1] = byte((v >> 16) % 256);
    b[2] = byte((v >> 8) % 256);
    b[3] = byte(v % 256);
    return b;
};

AddCRC = function (input) {
    input = Array.from(input);
    let s = parseInt(Crc32(input), 16);
    let b = toUint32(s);
    return input.concat(b);
};

CheckCRC = function (toCheck) {
    let data = toCheck.slice(0, toCheck.length - 4);
    let calc = toCheck.slice(toCheck.length - 4, toCheck.length);
    let input = Array.from(data);
    let s = parseInt(Crc32(input), 16);
    let crc = toUint32(s);
    if (crc.toString() === calc.toString()) {
        return data;
    } else {
        //throw error
        return [];
    }
};

module.exports = {
    AddCRC: AddCRC,
    CheckCRC: CheckCRC
};