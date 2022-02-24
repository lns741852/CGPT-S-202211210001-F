<template>
  <el-container class="home-container">
    <el-header>
      <h2>台北榮民總醫院 滅菌物品追蹤管理系統</h2>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">Open / Close</div>
        <!--router會搭配index找路徑-->
        <el-menu active-text-color="#ffd04b" unique-opened 
        :collapse="isCollapse" :collapse-transition="false" 
        :router="true" :default-active="activePath"
        background-color = "#7A7676">
          <!--一級目路-->
          <!--key,index使用唯一值-->
          <el-sub-menu  v-for="item in menulist" :key="item.oneId" :index="item.oneId">
            <template #title>
              <span>{{item.oneName}}</span>
            </template>
            <!--二級目錄-->
            <el-menu-item  v-for="item in item.twoMenuList"
             :key="item.twoId" :index="item.url" @click="saveNavState(item.url)">
               <span>{{icons[item.twoId]}}{{item.twoName}}</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!--main-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      menulist: [],
      //{Id,<自定參數>}
      icons:{
        '1':'1.',
        '2':'2.',
        '3':'3.',
        '4':'4.',
        '5':'5.'
      },
      isCollapse:false,
      activePath:''
    }
  },
  created() {
    this.getMenuList();
    this.activePath = localStorage.getItem('activePath')
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    getMenuList() {
      this.$axios.get("/menu").then((res) => {
        this.menulist = res.data.data
      });
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath){
        localStorage.setItem('activePath',activePath)
        this.activePath = activePath
    }

  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: rgb(66, 63, 63);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside {
  background-color: rgb(122, 118, 118);
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: rgb(202, 196, 196);
}
.toggle-button{
  text-align: center;
  font-size: 10px;
  line-height: 20px;
}
</style>