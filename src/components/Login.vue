<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!--表單-->
      <el-form
        :model="loginForm"
        ref="loginFormRef"
        :rules="loginFormRules"
        label-width="80px"
      >
        <el-form-item label="帳號: " prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密碼: " prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登入</el-button>
          <el-button type="info" @click="resetLoginForm">重製</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //:model
      loginForm: {
        //v-model
        username: "",
        password: "",
      },
      //:rules
      loginFormRules: {
        //prop
        username: [
          { required: true, message: "請輸入...", trigger: "blur" },
          { min: 3, max: 10, message: "長度3~10", trigger: "blur" },
        ],
        password: [
          { required: true, message: "請輸入...", trigger: "blur" },
          { min: 3, max: 10, message: "長度3~10", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //重製
    resetLoginForm() {
      //ref
      this.$refs.loginFormRef.resetFields();
    },
    //登入
    login() {
      //validate驗證rules的結果
      //async,await 優化Promise，增加可讀性
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        this.$axios.post("/login", this.loginForm).then((res) => {
            const jwt = res.headers["authorization"]; //拿token,  headers只能小寫
            localStorage .setItem("authorization", jwt); //存入token
            this.$router.push("/main");
          })
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgb(243, 240, 236);
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: rgb(238, 240, 239);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
