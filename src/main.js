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
import * as ElIconModules from '@element-plus/icons-vue'

const app =createApp(App)

app.config.globalProperties.$axios=axios //配置成全局組件
app.config.globalProperties.$msgbox=ElementPlus.ElMessageBox
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}

app.use(store).use(router).use(ElementPlus,{locale}).mount('#app')
