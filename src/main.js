/**
 * 全局配置
 */
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import "./assets/css/global.css"
import axios from './api/axios'
import locale from './assets/locale/cn';

const app =createApp(App)

app.config.globalProperties.$axios=axios //配置成全局組件


app.use(store).use(router).use(ElementPlus,{locale}).mount('#app')
