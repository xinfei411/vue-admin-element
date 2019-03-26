<template>
  <div class="layout">
    <div class="head">
      <div class="logo">WeMust综合信息管理系统</div>
      <div class="other">
        <router-link to="resetPassword" tag="span">
          <el-button>重置密码</el-button>
        </router-link>
        <el-button @click="exit">退出登录</el-button>
      </div>
    </div>
    <div class="body">
      <el-menu
          unique-opened
          :default-active="$route.path"
          class="el-menu-vertical-demo menu"
          router
          >
          <el-submenu :index="item.url" v-for="(item,index) in menu" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.text}}</span>
            </template>
            <el-menu-item :index="item.url" v-for="(item,index) in item.children" :key="index" :to="item.url">
              <span slot="title">{{item.text}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      <div class="content"><router-view/></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      menu: []
    };
  },
  created() {
    let vm = this;
    vm.get("get_user_menu.json", {}).then(data => {
      vm.menu = data.menu;
    });
  },
  methods: {
    exit(){
      localStorage.clear()
      location.reload();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
}
.body {
  display: flex;
}
.body > .menu {
  width: 240px;
  height: calc(100vh - 56px);
}
.body > .content {
  flex: 1;
  height: calc(100vh - 56px);
  padding: 10px 15px;
}
.head {
  display: flex;
  height: 56px;
  line-height: 56px;
  background-color: lightskyblue;
}
.head>.logo{
  width: 240px;
  font-size: 18px;
  text-align: center;
}
.head>.other{
  flex: 1;
  text-align: right;
  padding: 0 15px;
}
</style>
