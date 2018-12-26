<template>
  <div class="layout">
    <div class="head">头部</div>
    <div class="body">
      <div class="menu">菜单</div>
      <div class="content"><router-view/></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      title: "布局"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
}
.body{
  display: flex;
}
.head {
  height: 56px;
  line-height: 56px;
  background-color: lightskyblue;
}
.body>.menu{
  width:200px;
  background-color:lightcyan;
  height:calc(100vh - 56px);
}
.body>.content{
  flex:1;
  height:calc(100vh - 56px);
}
</style>
