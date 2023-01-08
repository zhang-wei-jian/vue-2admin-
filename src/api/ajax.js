import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'  //要记得引入样式文件

// 这个文件专门用来对axios进行二次封装

// 最终要实现的效果
// 配置基础路径和超时限制
// 添加进度条信息  nprogress
// 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
// 统一处理请求错误

// 创建一个axios实例  咱们之后发送请求 用的不是axios  而是你封装处理的ajax
const ajax = axios.create({
  baseURL: '/api', //基础路径
  timeout: 10000, //超时时间
});

// 添加请求拦截器
ajax.interceptors.request.use(function (config) {
  // 请求成功执行的回调函数
  // config 这是包含这次请求所有相关信息的一个对象(请求报文)
  // console.log(config,'config')
  // 开启进度条
  nprogress.start()
  // 这个config咱们之后会用 增加一些公共的请求参数
  // 咱们之后每次发送请求都携带用户的临时标识 可以添加购物车及获取购物车时让后端知道是谁

  // userTempId 是咱们前端自己生成的 v4() 一定有
  // token 是后端生成给咱们前端使用的 并且只有用户登录之后才有

  return config;
});

// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
  // 响应成功执行的回调
  // response 这是包含这次响应所有信息所组成的一个对象(响应报文)
  // console.log(response,'response')
  // 关闭滚动条
  nprogress.done()
  // 统一处理响应的数据格式
  return response.data; //return的结果就是发送请求获取到的结果
}, function (error) {
  // 响应失败执行的回调
  // console.log(error,'拦截器error')
 
  
  // 统一处理错误
  if(error.response.status===401){
    alert('未授权')
  }else if(error.response.status===403){
    alert('禁止访问')
  }else if(error.response.status===404){
    alert('错误访问')
  }else if(error.response.status===500){
    alert('服务器出错')
  }
  // 关闭滚动条
  nprogress.done()
  return new Promise(()=>{});  //返回了一个pending状态的promise
});

export default ajax
