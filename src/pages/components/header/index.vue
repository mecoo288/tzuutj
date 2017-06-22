<template>
  <header class="header">
    <el-menu mode="horizontal" class="header-nav" router>
      <el-menu-item index="/" class="logo">
        <img :src="logo"> 统计后台
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i></template>
        <el-menu-item index="/home/">首页</el-menu-item>
        <el-menu-item index="/authorize">账号管理</el-menu-item>
        <el-menu-item index="/changePWD">修改密码</el-menu-item>
        <el-menu-item index="" @click="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>
<script>
  import logo from '../../../static/imgs/home/logo.png';
  export default{
    data(){
      return {
        logo:logo,
      }
    },
    methods: {
      logout(){
        let _this = this;
        this.$store.dispatch('account/Do_logout', {
          callback({status, errmsg}){
            if(status == "0"){
              this.$message({
                message: errmsg,
                type: 'warning'
              });
              return;
            }
             _this.$store.commit('account/logout', null, {root: true});           
          }
        })
       //  this.$cookie.delete('txy_name')
      	// this.$cookie.delete('txy_token')
      	// this.$cookie.delete('cookieLogin')

      	// this.$router.push('/login')
      	// //window.location.reload();
      	// this.$store.dispatch('logout')	
      }
    },
    computed: {
      
    },
    components: {},
    props: ['menus', 'user'],
    created(){
    }
  }
</script>
<style lang="less">
  @headerHeight: 60px;
  /* k.liu */
  .header{
    position: fixed;
    height: @headerHeight;
    left: 0;
    top: 0;
    right: 0;
    z-index: 5;
    &:after{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      background-color: #527492;
      content: "";
    }
    &~ .content{
      padding-top: @headerHeight
    }
    &-nav{
      text-align: right;
      .el-submenu{
        float: right!important;
        margin-right: 20px;
      }
      .logo{
        font-size: 16px;
        img{
          height: 40px;
        }
      }
    }
  }
</style>
