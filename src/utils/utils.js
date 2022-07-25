/**
 * 对象深拷贝
 * @param data
 * @returns {{}|*}
 */
export const deepClone = data => {
    var type = getObjType(data)
    var obj
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}
/**
 * 判断数据类型
 * @param obj
 * @returns {string|*}
 */
export const getObjType = obj => {
    var toString = Object.prototype.toString
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}

/**
 * 一般用于字典回显，已知value展示label
 * @param {*} value 需要筛选的数据值
 * @param {*} props 对象，{labelkey: '', valueKey: ''},当前数据对应的可以 value
 * @param {*} data 原始数据,数组
 */
export function filterDict(value, data, props = {labelKey: 'label', valueKey: 'value'}) {
    if (!data) return value
    let arr = data.filter(item => item[props.valueKey] == value);
    let res = arr.length > 0 ? arr[0][props.labelKey] : '无';
    return res;
}

/**
 * 日期格式化
 * @param date 传入的date对象
 * @param format 格式化的形式
 * @returns {string}
 */
export function dateFormat(date, format = 'yyyy-MM-dd hh:mm:ss') {
    // let format = 'yyyy-MM-dd hh:mm:ss'
    if (date) {
        if (date instanceof Date) {
            var o = {
                'M+': date.getMonth() + 1, // month
                'd+': date.getDate(), // day
                'h+': date.getHours(), // hour
                'm+': date.getMinutes(), // minute
                's+': date.getSeconds(), // second
                'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
                'S': date.getMilliseconds() // millisecond
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1,
                        RegExp.$1.length === 1 ? o[k]
                            : ('00' + o[k]).substr(('' + o[k]).length))
                }
            }
            return format
        } else {
            return date || ''
        }
    }
}

/**
 * 获取数组里的ids
 * @param id
 * @param arr
 * @returns {string}
 */
export function getArrayIds(id, arr){
    let ids = "";
    arr.forEach((item,index)=>{
        ids = !index? item[id] : ids + ',' + item[id];
    })
    return ids
}