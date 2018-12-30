<template>
  <div class="login-box">
    <div class="resetPassword">
      <h2>{{ title }}</h2>
      <el-form :model="user" :rules="rules" ref="user" label-width="100px">
        <el-form-item label="旧密码" prop="password_o">
          <el-input v-model="user.password_o" type="password"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password1">
          <el-input v-model="user.password1" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sure('user')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "Login",
  data() {
    let validatePassword1 = (rule, value, callback) => {
      if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      title: "重置密码",
      user: {
        password_o: "",
        password: "",
        password1: ""
      },
      rules: {
        password_o: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password1: [{ required: true, validator: validatePassword1, trigger: "blur" }]
      }
    };
  },
  methods: {
    sure(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (!valid) return;
        vm.get("login.json", vm.user).then(data => {
          vm.$router.push("login");
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.resetPassword {
  width: 400px;
  border: 1px solid #ccc;
  margin: auto;
  padding: 30px;
}
.resetPassword h2 {
  text-align: center;
}
</style>
