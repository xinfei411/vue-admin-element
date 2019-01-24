/**
 * 日期格式化
 * @description 将时间戳或者日期字符串格式化
 * @author yaowq
 * @param {字符串} time 
 * @param {格式} format 
 * @returns {字符串} 格式化后的日期字符串
 * @example 1.模板中使用-无参数 {{new Date().getTime()|dateFormat}}
 * @example 2.模板中使用-有参数 {{new Date().getTime()|dateFormat('yyyy-MM-dd hh:mm:ss')}}
 * @example 3.函数中调用-实例外部 Vue.filter('dateFormat')(new Date().getTime(),'yyyy-MM-dd hh:mm:ss')
 * @example 4.函数中调用-实例内部 this.filter('dateFormat')(new Date().getTime(),'yyyy-MM-dd hh:mm:ss')
 */
let dateFormat = (time, format='yyyy-MM-dd hh:mm:ss') => {
  let date=new Date(time);   
  let o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return format;
}
export {dateFormat}