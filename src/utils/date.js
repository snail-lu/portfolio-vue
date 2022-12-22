/**
 * 获取当前日期及时间
 *
 * @returns {string} yyyy-MM-dd HH:mm:ss
 */
export function getNowTime() {
    let now = new Date()
    let year = now.getFullYear() // 得到年份
    let month = now.getMonth() // 得到月份
    let day = now.getDate().toString().padStart(2, '0') // 得到日期
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
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

export const dateFormat = (function () {
    let token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone =
            /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val)
            len = len || 2
            while (val.length < len) val = '0' + val
            return val
        }

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        let dF = dateFormat

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == '[object String]' && !/\d/.test(date)) {
            mask = date
            date = undefined
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date()
        if (isNaN(date)) throw SyntaxError('invalid date')

        mask = String(dF.masks[mask] || mask || dF.masks.default)

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == 'UTC:') {
            mask = mask.slice(4)
            utc = true
        }

        let _ = utc ? 'getUTC' : 'get',
            d = date[_ + 'Date'](),
            D = date[_ + 'Day'](),
            m = date[_ + 'Month'](),
            y = date[_ + 'FullYear'](),
            H = date[_ + 'Hours'](),
            M = date[_ + 'Minutes'](),
            s = date[_ + 'Seconds'](),
            L = date[_ + 'Milliseconds'](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H,
                HH: pad(H),
                M,
                MM: pad(M),
                s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? 'a' : 'p',
                tt: H < 12 ? 'am' : 'pm',
                T: H < 12 ? 'A' : 'P',
                TT: H < 12 ? 'AM' : 'PM',
                Z: utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
                o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4),
                S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (((d % 100) - (d % 10) != 10) * d) % 10]
            }

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1)
        })
    }
})()

// Some common format strings
dateFormat.masks = {
    default: 'ddd mmm dd yyyy HH:MM:ss',
    shortDate: 'm/d/yy',
    mediumDate: 'mmm d, yyyy',
    longDate: 'mmmm d, yyyy',
    fullDate: 'dddd, mmmm d, yyyy',
    shortTime: 'h:MM TT',
    mediumTime: 'h:MM:ss TT',
    longTime: 'h:MM:ss TT Z',
    isoDate: 'yyyy-mm-dd',
    isoTime: 'HH:MM:ss',
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
}

// Internationalization strings
dateFormat.i18n = {
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
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

/**
 * 获取指定日期所在月份的天数组成的数组
 * @param {*} date
 * @returns {[number]}
 */
export const getMonthDays = (date) => {
    const temp = new Date(date.getFullYear(), date.getMonth() + 1, 0) // 本月的最后一天
    const days = temp.getDate()
    return rangeArr(days)
}

/**
 * 计算指定日期所在月份的第一天是周几
 * @param {Date} date 日期
 * @returns {number} 0~6 0表示周日
 */
export const getFirstDayOfMonth = (date) => {
    const temp = new Date(date.getTime())
    temp.setDate(1)
    return temp.getDay()
}

/**
 * 获取指定日期上一月的最后几天日期
 * @param {Data} date 指定日期
 * @param {number} amount 指定要返回的天数
 * @returns {[number]} 天数组成的数组
 */
export const getPrevMonthLastDays = (date, amount) => {
    if (amount <= 0) return []
    const temp = new Date(date.getTime()) // 获取当前日期
    temp.setDate(0) // 获取上个月最后一天
    const lastDay = temp.getDate() // 上个月最后一天是多少号（1~31）
    return rangeArr(amount).map((_, index) => lastDay - (amount - index - 1))
}

/**
 * 生成1-n数组
 * @param {*} n 数组长度
 * @returns
 */
export const rangeArr = function (n) {
    return Array.from({ length: n }, (_, k) => k + 1)
}
