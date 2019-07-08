/**
 * 检测是不是除了symbol以外的原始数据
 * @param {*} value 
 */
export const isStatic = function(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value === null
    )
}


/**
 * 检测数据是不是原始数据
 * @param {*} value 
 */
export const isPrimitive = function(value) {
    return isStatic(value) || typeof value === 'symbol'
}


/**
 * 判断数据是不是引用类型的数据 (例如： arrays, functions, objects, regexes, new Number(0),以及 new String(''))
 * @param {*} value 
 */
export const isObject = function(value) {
    let type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}


/**
 * 检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
 * @param {*} value 
 */
export const isObjectLike = function(value) {
    return value != null && typeof value == 'object';
}


/**
 * 判断数据是不是Object类型的数据
 * @param {*} obj 
 */
export const isPlainObject = obj => '[object Object]' === Object.prototype.toString.call(obj)


/**
 * 判断数据是不是数组类型的数据
 * @param {*} arr 
 */
export const isArray = arr => '[object Array]' === Object.prototype.toString.call(arr);


/**
 * 判断数据是不是正则对象
 */
export const isRegExp = value => '[object RegExp]' === Object.prototype.toString.call(value);


/**
 * 判断数据是不是时间对象
 * @param {*} value 
 */
export const isDate = value => '[object Date]' === Object.prototype.toString.call(value);


/**
 * 检查 value 是不是函数
 * @param {*} value 
 */
export const isFunction = value => '[object Function]' === Object.prototype.toString.call(value);


/**
 * 判断 value 是不是浏览器内置函数
 * @param {*} value 
 * @desc 内置函数toString后的主体代码块为 [native code] ，
 * @desc 而非内置函数则为相关代码，所以非内置函数可以进行拷贝(toString后掐头去尾再由Function转)
 */
export const isNative = value => typeof value === 'function' && /native code/.test(value.toString())

/**
 * 检查 value 是否为有效的类数组长度
 * @param {*} value 
 */
export const isLength = value => typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;

/**
 * 检查 value 是否是类数组
 * @param {*} value 
 * @desc 如果一个值被认为是类数组，那么它不是一个函数，
 * @desc 并且value.length是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。这里字符串也将被当作类数组。
 */
export const isArrayLike = value => value != null && isLength(value.length) && !isFunction(value);


/**
 * 检查 value 是否为空
 * @param {*} value 
 * @desc 如果是null，直接返回true；
 * @desc 如果是类数组，判断数据长度；
 * @desc 如果是Object对象，判断是否具有属性；
 * @desc 如果是其他数据，直接返回false(也可改为返回true)
 */
export const isEmpty = function(value) {

    if (value == null) {
        return true;
    }
    if (isArrayLike(value)) {
        return !value.length;
    } else if (isPlainObject(value)) {
        for (let key in value) {
            if (hasOwnProperty.call(value, key)) {
                return false;
            }
        }
    }
    return false;

}

/**
 * 记忆函数：缓存函数的运算结果
 * @param {*} fn 
 */
export const cached = fn => {
    let cache = Object.create(null);
    return function cachedFn(str) {
        let hit = cache[str];
        return hit || (cache[str] = fn(str))
    }
}

/**
 * 横线转驼峰命名
 */
let camelizeRE = /-(\w)/g;
export const camelize = str => {
    return str.replace(camelizeRE, function(_, c) {
        return c ? c.toUpperCase() : '';
    })
}

/**
 * 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写
 */
let hyphenateRE = /\B([A-Z])/g;
export const hyphenate = str => str.replace(hyphenateRE, '-$1').toLowerCase();


/**
 * 字符串首位大写
 * @param {*} str 
 */
export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);



/**
 * 获取数据类型，返回结果为 Number、String、Object、Array等
 * @param {*} value 
 */
export const getRawType = value => Object.prototype.toString.call(value).slice(8, -1)

// ---> 18  https://juejin.im/post/5d1cb9e46fb9a07ef1619f09#heading-22

export default {
    isStatic,
    isPrimitive,
    isObject,
    isObjectLike,
    isPlainObject,
    isArray,
    isRegExp,
    isDate,
    isNative,
    isFunction,
    isLength,
    isArrayLike,
    isEmpty,

    cached,
    camelizeRE,
    hyphenateRE,
    capitalize,

    getRawType
}