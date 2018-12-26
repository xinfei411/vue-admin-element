<template>
  <div class="login">
    <h1>{{ title }}</h1>
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      title: "欢迎登录",
      user:{
        username:'ywq',
        password:'123456',
      }
    };
  },
  methods: {
    login(){
      let vm=this;
      vm.get('login.json',vm.user).then(data=>{
        localStorage.token=data.token;
        vm.$router.push('dashboard');
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
