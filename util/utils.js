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
                if (obj[k] != null && typeof(item) === "object"){
                    p.push(sortObjectKeys(item));
                } else {
                    p.push(item);
                }
            });
            tmp[k] = p;
        }else if (obj[k] != null && typeof(obj[k]) === "object"){
            tmp[k] = sortObjectKeys(obj[k]);
        }else {
            //TODO : string ？
            tmp[k] = new String(obj[k]);
        }
    });
    return tmp;
};

module.exports = {sortObjectKeys};