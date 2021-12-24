

const mineUtil = {};



mineUtil.getNowTime = function (event) {
  let now = new Date();
  let year = now.getFullYear(); //得到年份
  let month = now.getMonth(); //得到月份
  let date = now.getDate(); //得到日期
  let hour = " 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
  month = month + 1;
  month = month.toString().padStart(2, "0");
  date = date.toString().padStart(2, "0");
  let defaultDate = `${year}-${month}-${date}${hour}`;
  console.log(defaultDate);
  return defaultDate;
}




module.exports = mineUtil;
