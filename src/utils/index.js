/**
 * url参数部分转对象
 *
 * @param {string} url
 * @return {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}');
}

/**
 * 获取指定范围内的随机数（整数）
 *
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number}
 */
export function randomData(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 获取数组中最小值的索引
 *
 * @param {arrry} arr 待遍历的数组
 * @return {number} index 最小值的suoyin
 */
export function getMinValueIndexOfArr(arr) {
    let minValue = Math.min(...arr);
    return arr.indexOf(minValue);
}

/**
 * 校验当前浏览器是否支持IntersectionObserver
 * @returns 
 */
export function checkIntersectionObserver() {
    const inBrowser = typeof window !== 'undefined' && window !== null
    if (
        inBrowser &&
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
    ) {
        // Minimal polyfill for Edge 15's lack of `isIntersecting`
        // See: https://github.com/w3c/IntersectionObserver/issues/211
        if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
            Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
                get: function () {
                    return this.intersectionRatio > 0
                }
            })
        }
        return true
    }
    return false
}