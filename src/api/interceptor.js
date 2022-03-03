/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 * {
 *    code:0,
 *    data:"成功",
 *    Message:""
 * }
 */
 import axios from 'axios'
 import router from '../router'
 import {ElMessage} from "element-plus"

 // 創建一個實例
 const service = axios.create({ 
     // 自帶URL
     baseURL: '/api/HTPE',
     // 統一請求頭
     headers: {
        "Content-Type": "application/json;charset=utf-8"
     },
     // 超時
     timeout: 5000, 
     // 是否夾帶cookie
     withCredentials: false
 });
 // 請求攔截器
 service.interceptors.request.use(config => {  
     if(localStorage.getItem("authorization") !== "reset"){   
        config.headers['authorization']=localStorage .getItem("authorization");
     }
     return config;
 });
 // 返回結果攔截
 service.interceptors.response.use((response)=>{
     // 獲得資料
     const res = response;
     // 成功
     if(res.data.code === 200){    
         if(res.data.data ===""){
             ElMessage.success(res.data.msg)
         }
         return res;       
     }else if(res.data.data.code === 403){
         // 沒權限
         ElMessage.error(res.data.msg);
         //移除token
         localStorage.setItem("authorization", "reset"); 
         //跳轉
         router.push("/login")
         //等於window.location.href = '/#/login';
         return res;
     }else {       
        ElMessage.error(res.data.msg);
        return res;
     }
 },()=>{
    //ElMessage.error('網路異常');
 });
 export default service;