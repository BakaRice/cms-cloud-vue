import axios from "axios";
import store from "@/store";
import { ResultVO } from "@/mock";
import { UPDATE_EXCEPTION } from "@/store/VuexTypes";

axios.defaults.baseURL = "/api/";

axios.interceptors.request.use(
  (req) => {
    const auth = sessionStorage.getItem("token");
    // 判断,用于避免header包含authorization属性但数据值为空
    if (auth) {
      req.headers.token = auth;
    }
    console.log("axios全局拦截req:{}", req);
    return req;
  },
  (error) => {
    store.commit(UPDATE_EXCEPTION, error.message);
    return Promise.reject();
  }
);
axios.interceptors.response.use(
  (resp) => {
    console.log("resp");

    // 从响应获取响应体对象
    const data: ResultVO = resp.data;
    console.log("axios全局拦截resp:{}", resp);
    // 全局处理后端返回的异常信息。即，业务状态码不是200
    if (resp.status != 200) {
      store.commit(UPDATE_EXCEPTION, data.message);
      return Promise.reject(data);
    }
    if (resp.status == 200 && resp.data.code != 10000) {
      store.commit(UPDATE_EXCEPTION, data.message);
      return Promise.reject(data);
    }
    console.log("axios全局拦截resp2:{}", resp);
    return resp;
  },
  // 全局处理异常信息。即，http状态码不是200
  (error) => {
    console.log(error.response.status);
    console.log(error.message);

    const code: number = error.response.status;
    switch (code) {
      case 400:
        // error.message = "401:身份验证失败，请关闭重新进入。";
        console.log(error.message);
        break;
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        error.message = "401:身份验证失败，请关闭重新进入。";
        console.log(error.message);
        break;

      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        error.message = "403:登录过期，请关闭重新进入。";
        console.log(error.message);
        // 清除token
        break;

      // 404请求不存在
      case 404:
        error.message = "404:您访问的网页不存在。";
        console.log(error.message);
        break;
      // 其他错误，直接抛出错误提示
      default:
        // error.message = "other:服务器出了点小错误，请稍后重试~";
        console.log(error.message);
    }

    store.commit(UPDATE_EXCEPTION, error.message);
    console.log("axios全局拦截resp error:{}", error.message);
    return Promise.reject();
  }
);

export default axios;
