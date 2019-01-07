<template>
  <div class="login-box">
    <div class="login">
      <h2>{{ title }}</h2>
      <el-form :model="user" :rules="rules" ref="user" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password" @keyup.native.enter="login('user')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('user')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      title: "欢迎登录",
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    login(formName) {
      let vm = this;
      vm.$refs[formName].validate((valid) => {
        if(!valid) return;
        vm.get("login.json", vm.user).then(data => {
          localStorage.token = data.token
          vm.$router.push(vm.$route.query.redirect||'/')
        });
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.login {
  width: 400px;
  border: 1px solid #ccc;
  margin: auto;
  padding: 30px;
}
.login h2 {
  text-align: center;
}
</style>
