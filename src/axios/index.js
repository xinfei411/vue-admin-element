//引入axios
import axios from 'axios'
import Vue from 'vue'

let cancel, promiseArr = {},loadingInstance
const CancelToken = axios.CancelToken;
//请求拦截器
axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  loadingInstance = Vue.prototype.$loading({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)' });
  return config
}, error => {
  return Promise.reject(error)
})

//响应拦截器
axios.interceptors.response.use(response => {
  closeLoading();
  let resp=response.data
  if(resp.ret_code=="000000"){
    return resp.ret_data
  }else{
    Vue.prototype.$message({
      type: 'error',
      message: resp.ret_msg||'请求错误,未找到该资源'
    });
  }
}, err => {
  closeLoading();
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break;
      case 401:
        err.message = '未授权，请重新登录'
        localStorage.clear();
        location.href="/";
        break;
      case 403:
        err.message = '拒绝访问'
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        break;
      case 405:
        err.message = '请求方法未允许'
        break;
      case 408:
        err.message = '请求超时'
        break;
      case 500:
        err.message = '服务器端出错'
        break;
      case 501:
        err.message = '网络未实现'
        break;
      case 502:
        err.message = '网络错误'
        break;
      case 503:
        err.message = '服务不可用'
        break;
      case 504:
        err.message = '网络超时'
        break;
      case 505:
        err.message = 'http版本不支持该请求'
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = "连接到服务器失败"
  }
  Vue.prototype.$message({
    type: 'error',
    message: err.message
  });
  return Promise.resolve(err.response)
})

axios.defaults.baseURL = '/static/mock/'
//设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  // 'Authorization': localStorage.token,
}
axios.defaults.timeout = 10000
function closeLoading(){
  Vue.nextTick(function(){
    let st = setTimeout(function(){
      loadingInstance.close();
      window.clearTimeout(st);
    },300);
  });
}
export default {
  //get请求
  get(url, param) {
    Object.assign(param,{token:localStorage.token})
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },
  //post请求
  post(url, param) {
    Object.assign(param,{token:localStorage.token})
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  }
}