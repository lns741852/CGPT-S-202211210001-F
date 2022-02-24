/**
 * request.js
 * 通過promise對axios二次封裝
 */
 import instance from './interceptor'
 import {ElMessage,ElLoading} from "element-plus"
 
 /**
  * @param {url} 請求地址
  * @param {params} 請求參數
  * @param {options} 請求配置
  * @param Loading 是否顯示Loading
  * @param mock 本次是否使用mock
  */
 function request(url,params,options={Loading:true,mock:false},method){
     let LoadingInstance;
     // 載入中...
     if(options.Loading)LoadingInstance = ElLoading.service();
     return new Promise((resolve,reject)=>{
         let data = {}
         // get使用params字段
         if(method =='get')data = {params}
         // post使用data字段
        if(url !=='/login'){
            if(method =='post')data = {data:params}  
        }else{
            if(method =='post')data = {params}
        }
               
         // mock配置
         if(options.mock)url='http://www.mock.com/mock/xxxx/api';
         instance({            //攔截器
             url,
             method,
             ...data
         }).then((res)=>{      
             // 此處可以實現擴展功能
             // 如對接多個api，數據結構調適
             // 也可添加日期，數字等等
             if(res.data.code === 200){
                 resolve(res);
             }else{
                 reject(res);
             }
         }).catch((error)=>{
            ElMessage.error(error.msg)
         }).finally(()=>{
             LoadingInstance.close();   //關閉載入中...
         })
     })
 }
 // 封裝get
 function get(url,params,options){
     return request(url,params,options,'get')
 }
 // 封裝post
 function post(url,params,options){
     return request(url,params,options,'post')
 }
 
 //就可以在其他js中import
 export default {
     get,post
 }