/**
 * url参数部分转对象
 *
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}')
}

/**
 * 获取指定范围内的随机数（整数）
 *
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number}
 */
export function randomData(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
