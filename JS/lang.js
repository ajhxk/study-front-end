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


export default {
    isStatic,
    isPrimitive
}