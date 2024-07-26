import axios from 'axios'
import router from '@/router'
import {
  Message
} from 'element-ui';
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

/* const errorHandle = (status, other) => {
  //HTTP状态码判断
  switch (status) {
    //401：未登录状态，跳转至登录页
    case 401:
      this.$router.replace({ name: 'login' });
      Message.error('用户未登录或登录过期');
      break;
    case 403:
      localStorage.removeItem('token');
      this.$router.replace({ name: 'login' });
      Message.error('没有权限，请联系管理员');
      break;
    case 404:
      Message.error('请求资源不存在')
      break

  }
} */

const errorHandle = (error) => {
  if (error.response) {
    // 请求发送成功，响应接收完毕，但是状态码为失败的情况
    // 1.判断失败的状态码情况（主要处理401的情况）
    const {
      status
    } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // 2.Token无效（过期）处理
      errorMessage = '用户未登录或登录过期'
      if (localStorage.getItem('token')) localStorage.clear()
      router.push({
        name: 'login'
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务器错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，未收到响应
    Message.error('请求超时请重试')
  } else {
    // 意料之外的错误
    Message.error(error.message)
  }
  // 将本次请求的错误对象继续向后抛出，让接收响应的处理函数进行操作

}


//创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
})

service.interceptors.request.use(config => {
  nProgress.start();
  const token = localStorage.getItem('token');
  //如果存在token，请求携带这个token
  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, error => {
  nProgress.start();
  return Promise.reject(error);
})


service.interceptors.response.use(response => {
  nProgress.done();
  //打印返回数据
  //console.dir(response)
  if (response.status && response.status === 200) {
    if (response.data.code === 0) {
      Message.error(response.data.msg)
    }
  }
  return response;
}, error => {
  nProgress.done();
  errorHandle(error);
  console.dir(error);
  return Promise.reject(error.response);
})


/* export const post = (url, data) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: data
  })
}

export const get = (url, params) => {
  return axios({
    method: 'get',
    url: `${url}`,
    data: params
  })
}
 */
export default service;