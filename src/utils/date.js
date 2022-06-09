/**
 * 获取当前日期及时间
 *
 * @returns {string} yyyy-MM-dd HH:mm:ss
 */
export function getNowTime() {
    let now = new Date()
    let year = now.getFullYear() //得到年份
    let month = now.getMonth() //得到月份
    let day = now.getDate().toString().padStart(2, '0') //得到日期
    let hours = now.getHours().toString().padStart(2, '0') // 得到时
    let minutes = now.getMinutes().toString().padStart(2, '0') // 得到分
    let seconds = now.getSeconds().toString().padStart(2, '0') // 得到秒

    month = month + 1
    month = month.toString().padStart(2, '0')
    let defaultDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return defaultDate
}

/**
 * 格式化时间
 *
 * 根据传入时间与当前时间对比，返回对应字符串显示
 *
 * @param {number} time 待处理时间
 * @param {string} option 目标时间格式
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

/**
 * 时间格式转换
 *
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
            time = parseInt(time)
        }
        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}
