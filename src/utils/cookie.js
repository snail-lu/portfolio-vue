export function getCookie(name) {
    let arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) return arr[2]
    else return null
}

export function queryCookie(name) {
    let arr = document.cookie.split('; ')
    arr.forEach((item) => {
        console.log(item)
        if (item.indexOf(name) > -1) {
            return item.split('=')[1]
        }
    })
}
