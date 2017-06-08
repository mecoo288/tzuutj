<template>
  <div class="wrapper ui  centered grid" style="margin:0">
    <div class="body">
      <div class="banner">
        土著游统计后台系统
      </div>
      <form class="ui form" @submit.prevent="submit">
        <div class="title" ><i class="user icon"></i> 登录</div>
        <div class="ui left icon input fluid field">
          <i class="user icon"></i>
          <input  type="text" v-model="name" class="form-control" placeholder="请输入账号"  @focus="myfocus"></input>
          <i class="check circle outline icon right valok" v-if="isOk.name"></i>
        </div>
        <div class="ui left icon input fluid field">
          <i class="privacy icon"></i>
          <input type="password" class="form-control" v-model="passWd" placeholder="请输入密码" @focus="myfocus">
          <i class="check circle outline icon right valok" v-if="isOk.passWd"></i>
        </div>
        <div class="ui red message" v-if="tips">
          <i class="warning circle icon"></i>{{tips}}
        </div>
        <button class="fluid ui button" :class="{primary: parmaIsOk}" :disabled="!parmaIsOk">登 录</button>
      </form>
    </div>
    <div id="footer" >
     <img src="../../../components/static/imgs/login/logo.png">
     上海糖玩国际旅行社有限公司
   </div>
 </div>


</div>
</template>
<script>

  const RS_OK='00000'
  export default{
    data(){
      return {
        parmas:{
          name: "",
          passWd: "",
          is_vue: 1,
          isLogin: true
        },
        name: "",
        passWd:"",
        tips: '',
        isChecked: true,
        isOk:{
          name: false,
          passWd: false
        }
      }
    },
    computed:{
      parmaIsOk(){
        return this.isOk.name && this.isOk.passWd;
      }
    },
    watch:{
      name(val, oldVal){
        this.parmas.name = val;
        this.isOk.name = /^.{2,}$/.test(val);
      },
      passWd(val, oldVal){
        this.parmas.passWd = val;
        this.isOk.passWd = /^.{6,}$/.test(val);
      }
    },
    methods: {
      myfocus(){
        this.tips=''	
      },
      submit(){
        let _this = this;
        this.$store.dispatch('Do_login' , this.parmas).then((rs) => {
          let obj = rs.data

          if (obj.code == RS_OK) {
            this.tips = '登录成功!';

            this.$router.push('/home');
            window.location.reload();


        }else{
          this.tips = obj.msg?obj.msg:"登录失败，用户名或密码错误";
        }
      })

      }
    },
    created(){
      let _this= this;
      this.$store.commit('needLogged', true);
    }

  }
</script>
<style lang="less">
  @import "../../../static/style/mixin";
  @dir: "static/imgs/login/";

  ::-webkit-input-placeholder {
    color:#aaaaaa !important;
    font-size:14px;
  }
  ::-moz-placeholder {
    color:#aaaaaa !important;
    font-size:14px;
  }
  :-ms-input-placeholder {
    color:#aaaaaa !important;
    font-size:14px;
  }

  #autologin{
    padding-bottom:62px;   
  }

  #autologin label{
    font-size:14px;
    color:#34495e;	
  }   


  .wrapper{
    position: fixed;
    top:0px;
    width: 100%;
    height:100%;
    @w: 100%;
    @h: 100%;
    .bg-img(@dir, 'bg_big.png', @w, @h);
    .body{
      padding: 8% 0 10px;
    }
    .banner{
      .bg-img(@dir, 'bg_small.png', @w, @h);
      width: 600px;
      height:192px;
      font-size: 28px;
      text-align: center;
      color: white;
      line-height:192px;
      height: 192px;
    }
    .valok{
      left: inherit!important;
      right: 0!important;
    }
    .form {
      width:100%;
      background-color: white;
      margin:0 auto;
      padding-left:70px;
      padding-right:70px;
      padding-bottom: 30px;
      input{
       height:56px;
     }
     .button{
      height: 50px;
      margin-top: 20px;
    }
    .remenberMe{
      display: block;
      text-align: left;
    }
    .title {
      padding-top:30px;
      padding-bottom:24px;
      text-align: left;
      font-size:24px;
      color:#34495e;
      margin:0 auto;
    }
  }
}

#footer{
  padding-top:40px;
  text-align:center;
  color:white; 
  position:absolute;
  left:30%;
  top:80%;
  bottom:3%;
}
</style>
