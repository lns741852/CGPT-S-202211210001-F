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
      <el-aside :width="isCollapse ? '64px' : '200px'">
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
              <component  :is="icons[item.oneId]"></component>                 
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
                <span>
                  <div class="line_two"></div>
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
        1: "1.",
        2: "2.",
        3: "3.",
        4: "4.",
        5: "5.",
        6: "Setting",
        8: "Operation",
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
    font-size: 12px;
    margin: 5px;
  }
  img {
    height: 100px;
  }
}
.el-aside {
  background-color: #fff;
  .el-menu {
    border-right: none;
    /deep/.el-icon {
      font-size: 18px;
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
.icon{
  margin: 0 5px 0 0;
  width: 20px;
  height: 20px;
}
</style>