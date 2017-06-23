<template>
  <header class="header">
    <el-menu mode="horizontal" class="header-nav" router>
      <el-menu-item index="/" class="logo">
        <img :src="logo"> 统计后台
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i></template>
        <el-menu-item index="/home/">首页</el-menu-item>
        <el-menu-item index="/changePWD">修改密码</el-menu-item>
        <el-menu-item index="" @click="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>
<script>
  import logo from '../../../static/imgs/home/logo_white.png';
  export default{
    data(){
      return {
        logo:logo,
      }
    },
    methods: {
      logout(){
        let _this = this;
        this.$store.dispatch('account/Do_logout', this)
      }
    },
  }
</script>
<style lang="less">
  
</style>
