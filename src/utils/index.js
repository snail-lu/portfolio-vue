// 根据传入的属性字段进行排序
export function compare (propertyName) {
    return function (obj1, obj2) {
      var value1 = obj1[propertyName]
      var value2 = obj2[propertyName]
      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.localeCompare(value2, 'zh')
      } else {
        if (value1 <= value2) {
          return -1
        } else if (value1 > value2) {
          return 1
        }
      }
    }
}