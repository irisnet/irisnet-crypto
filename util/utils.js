'use strict';

/**
 *
 * @param obj 需要排序的对象
 */
let sortObjectKeys = function (obj) {
    let tmp = {};
    Object.keys(obj).sort().forEach(function (k) {
        if(Array.isArray(obj[k])){
            let p = [];
            obj[k].forEach(function (item) {
                if (item != null && typeof(item) === "object"){
                    p.push(sortObjectKeys(item));
                } else {
                    p.push(item);
                }
            });
            tmp[k] = p;
        }else if (obj[k] != null && typeof(obj[k]) === "object"){
            tmp[k] = sortObjectKeys(obj[k]);
        }else {
            tmp[k] = new String(obj[k]).toString();
        }
    });
    return tmp;
};

module.exports = {sortObjectKeys};