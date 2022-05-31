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
