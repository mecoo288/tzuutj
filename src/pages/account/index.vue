<template>
  <div class="account-wrapper">
    <div class="main">
      <header class="main-header"></header>
      <router-view class="main-body"></router-view>
    </div>
    <footer class="account-footer">
      <img src="../../static/imgs/login/logo.png">
      上海糖玩国际旅行社有限公司
    </footer>
  </div>


</div>
</template>
<script>
  export default{
    data(){
      return {
        
      }
    },
  }
</script>
<style lang="less">
  .account-wrapper,
  .header{
    background-size: cover;
    background-repeat: no-repeat;
  }
  .account-wrapper{
    background-image: url('../../static/imgs/login/bg_big.png');
    padding-top: 1px;
    margin-top: -1px;
  }
  .account-footer{
    text-align: center;
    color: #fff;
    margin-top: 50px;
    img{
      vertical-align: middle;
      height: 28px;
    }
  }
  .main{
    width: 600px;
    margin:  0 auto;
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    margin-top: 100px;
    &-header{
      background-image: url('../../static/imgs/login/bg_small.png');
      height: 192px;
      padding: 1px;
      &:before{
        content: "土著游统计后台系统";
        margin-top: 80px;
        display: block;
        text-align: center;
        color: #fff;
        font-size: 30px;
      }
    }
    &-body{
      padding: 40px;
    }
    .submitBtn{
      display: block;
      width: 100%;
    }
  }
</style>
