<template>
  <div v-show="loadingShow" class="loader-wrapper">
      <div class="loader">
        <!--<div class="loader-inner ball-scale-multiple">-->
          <!--<div></div>-->
          <!--<div></div>-->
          <!--<div></div>-->
        <!--</div>-->
        <div class="loading"></div>
      </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
      }
    },
    props:['loadingShow']
  }
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../../common/style/mixin.less";
  @dir: "./common/";
  @-webkit-keyframes ball-scale-multiple {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 0;
    }

    5% {
      opacity: 1;
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }

  @keyframes ball-scale-multiple {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 0;
    }

    5% {
      opacity: 1;
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }

  .ball-scale-multiple {
    position: relative;
    -webkit-transform: translateY(-30px);
    -ms-transform: translateY(-30px);
    transform: translateY(-30px);
  }

  .ball-scale-multiple > div:nth-child(2) {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .ball-scale-multiple > div:nth-child(3) {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .ball-scale-multiple > div {
    background-color: #34495c;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;
    margin: 0;
    width: 60px;
    height: 60px;
    -webkit-animation: ball-scale-multiple 1s 0s linear infinite;
    animation: ball-scale-multiple 1s 0s linear infinite;
  }
  .loader-wrapper{
    width:100%;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(255,255,255,.6);
    .loader {
      height: 100px;
      position: absolute;
      text-align: center;
      width: 100%;
      top: 50%;
      left: 0;
      margin-top: -50px;
      .loading{
        @h: 56px;

        height: @h;
        background-image: url(loading.gif);
        background-size: 56px;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }

</style>
