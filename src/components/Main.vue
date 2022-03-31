<template>
  <el-container class="home-container">
    <el-header>
      <img src="../assets/images/TVGHheader.png" />
      <div>
        <span
          >&nbsp;&nbsp;&nbsp;&nbsp;{{ userName }} 您好<br />歡迎使用本系統</span
        >
        <el-button class="success_button">個人資料編輯</el-button>
        <el-button class="delete_button" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '280px'">
        <div class="toggle-button" @click="toggleCollapse">
          <el-icon><fold /></el-icon>
        </div>
        <!--router會搭配index找路徑-->
        <el-menu
          active-text-color="#E6A23C"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
          background-color="#FFF"
        >
          <!--一級目路-->
          <!--key,index使用唯一值-->
          <el-sub-menu
            v-for="item in menulist"
            :key="item.oneId"
            :index="item.oneId"
          >
            <template #title>
              <component :is="icons[item.oneId]"></component>
              <span>{{ item.oneName }}</span>
            </template>
            <!--二級目錄-->
            <el-menu-item
              v-for="item in item.twoMenuList"
              :key="item.twoId"
              :index="item.url"
              @click="saveNavState(item.url)"
            >
              <template #title>
                <div class="line_two"></div>
                <span>
                  {{ icons[item.twoId] }}{{ item.twoName }}
                </span>
              </template>
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
  data() {
    return {
      menulist: [],
      //{Id,<自定參數>}
      icons: {
        1: "Setting",
        2: "1.",
        3: "2.",
        4: "3.",
        5: "4.",
        6: "5.",
        7: "6.",
        8: "7.",
        9: "8.",
        10: "9.",
        11: "10.",
        12: "11.",
        13: "Operation",
        14: "1.",
      },
      isCollapse: false,
      activePath: "",
      userName: "",
    };
  },
  created() {
    this.getMenuList();
    this.activePath = localStorage.getItem("activePath");
    this.getUsername();
    this.saveAllSetno();
    this.saveAllCasecar();
  },

  methods: {
    logout() {
      localStorage.clear();
      localStorage.setItem("authorization", "reset");
      this.$router.push("/login");
    },
    getMenuList() {
      this.$axios.get("/menu").then((res) => {
        this.menulist = res.data.data;
      });
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      localStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    getUsername() {
      this.userName = localStorage.getItem("username");
    },
    saveAllSetno(){
       this.$axios.get("/setdata/all").then((res) => {
          localStorage.setItem("setnoAll", res.data.data); //存入所有盤包
      });    
    },
    saveAllCasecar(){
       this.$axios.get("/casecar/all").then((res) => {
          localStorage.setItem("casecarAll", res.data.data); //存入所有盤包
      });    
    }
  },
};
</script>

<style lang="less" scoped>

.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #d4dfbb;
  height: 100px;
  > div span {
    display: block;
    margin: 5px 25px;
  }
  > div /deep/ .el-button {
    font-size: 16px;
    margin: 5px;
  }
  img {
    width: 23%;
    height: 100%;
  }
}
.el-aside {
  background-color: #fff;
  .el-menu {
    border-right: none;
    span{
      font-size: 16px;
    }
  }
}
.toggle-button {
  text-align: right;
  font-size: 20px;
}
.el-main {
  background-color: #fefaee;
}
.line_two {
  float: left;
  margin: 0 10px 0 0;
  height: 50px;
  width: 5px;
  background: #c16124;
}
.icon {
  margin: 0 5px 0 0;
  width: 20px;
  height: 20px;
}
</style>