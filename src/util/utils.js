'use strict';

module.exports = class Utils {
    static sortObjectKeys(obj) {
        let sort = function (obj) {
            let tmp = {};
            Object.keys(obj).sort().forEach(function (k) {
                if (Array.isArray(obj[k])) {
                    let p = [];
                    obj[k].forEach(function (item) {
                        if (item != null && typeof (item) === "object") {
                            p.push(sort(item));
                        } else {
                            p.push(item);
                        }
                    });
                    tmp[k] = p;
                } else if (obj[k] != null && typeof (obj[k]) === "object") {
                    tmp[k] = sort(obj[k]);
                } else if (obj[k] != null && typeof (obj[k]) === "function") {
                    tmp[k] = evil(obj[k].toString())
                } else {
                    tmp[k] = new String(obj[k]).toString();
                }
            });
            return tmp;
        };
        return sort(obj)
    }

    static isEmpty(obj) {
        switch (typeof obj) {
            case "undefined": {
                return true
            }
            case "string": {
                return obj.length === 0
            }
            case "number": {
                return obj === 0
            }
            case "object": {
                if (obj == null) {
                    return true
                } else if (Array.isArray(obj)) {
                    return obj.length === 0
                } else {
                    return Object.keys(obj).length === 0
                }
            }
        }
    }

    static toString(str) {
        if (typeof str === "number") {
            str = str.toLocaleString();
            return str.replace(/[,]/g, '');
        } else if (this.isEmpty(str)) {
            return ""
        } else {
            return str.toString()
        }
    }

    static hasRepeatElement(target, splitChar) {
        if (!(target instanceof Array)) {
            if (this.isEmpty(splitChar)) {
                throw new Error("split char is empty");
            }
            target = target.split(splitChar)
        }
        let srcLen = target.length;
        let eSet = new Set(target);
        return !(srcLen == eSet.size)
    }

    static marshalUTCString(date) {
        let utcDateStr = date.toISOString();
        let nanoIndex = utcDateStr.lastIndexOf(".");
        let prefix = utcDateStr.substr(0, nanoIndex);
        let nano = utcDateStr.substr(nanoIndex + 1, utcDateStr.length - 1);
        let index = nano.length - 2;
        let offset = 0;
        while (index >= 0 && nano[index] === "0") {
            index--
        }
        if (index < 0) {
            return `${prefix}Z`
        }
        let suffix = nano.substr(0, index + 1);
        return `${prefix}.${suffix}Z`
    }
};

function evil(fn) {
    let Fn = Function;
    return new Fn('return ' + fn)();
}