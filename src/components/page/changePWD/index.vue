<template>
  <div class="login-all22 ui centered grid" style="margin:0">

    <div class="login-wrapper12 eight  wide column" >
      <div class="login-small-img">
       <div class="login-small-img-in">
        土著游统计后台系统
      </div>
    </div>
    <form action="" role="form" @submit.prevent="savePWD" autocomplete="off">
      <div class="form-group loginme" ><i class="braille icon"></i> 修改密码</div>

      <div class="ui left icon input fluid">
        <i class="lock icon"></i>
        <input  type="password" v-model="oldPwd" class="form-control iconlock" placeholder="请输入原密码" ></input>
        <i class="check circle outline icon right valok" v-if="isOk.oldPwd"></i>
      </div>

      <div class="ui left icon input fluid">
        <i class="lock icon"></i>
        <input type="password" class="form-control iconlock" maxlength="16" v-model="newPwd" placeholder="请输入新密码">
        <i class="check circle outline icon right valok" v-if="isOk.newPwd"></i>
      </div>
      <div class="ui left icon input fluid">
        <i class="lock icon"></i>
        <input type="password" class="form-control iconlock" maxlength="16" v-model="reNewPwd" placeholder="请重复输入新密码">
        <i class="check circle outline icon right valok" v-if="isOk.reNewPwd"></i>
      </div>

      <!-- <div class="loginbutton" > -->
       <button type="submit" class="btn btn-primary" :disabled="!isAllOk || saving">确 认</button>
       <!-- <button type="submit" class="btn btn-primary" :disabled="saving">确 认</button> -->
       <!-- <button type="submit" class="ui button blue fluid">确 认</button> -->
        <a href="javascript:history.go(-1);" class="cancle-modify">取消修改</a><br>
      <!-- </div> -->

   </form>

   <div id="footer" >
     <img src="../../../components/static/imgs/login/logo.png">
     上海糖玩国际旅行社有限公司
   </div>

 </div>
</div>
</template>
<script>
  const RS_OK='00000';
  const PWD_reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,16}$/;
  export default{
    data(){
      return {
        oldPwd:'',
        newPwd:'',
        reNewPwd:'',
        parmas: {
          oldPwd:'',
          newPwd:'',
        },
        errmsg: '',
        isOk: {
          oldPwd: false,
          newPwd: false,
          reNewPwd: false,
        },
        saving: false
      }
    },
    methods: {
      checkLogin(){
        if( !(this.$cookie.get('txy_name')!==null && this.$cookie.get('txy_token')!==null) ){
          this.$router.push('/login');
        }
      },
      removeErr(){
        this.errmsg="";
      },
      savePWD(){
        let _this = this;
        this.saving = true;
        this.$store.dispatch('doChangePWD', this.parmas).then(function({body, status, statusText}){
          _this.saving = false;
          if(status !== 200){
            alert(statusText);
            return;
          }
          if(body.code === '50002'){
            alert(body.msg);
            return;
          }
          if(body.code === '50004'){
            _this.$cookie.delete('txy_name')
            _this.$cookie.delete('txy_token')
            _this.$cookie.delete('cookieLogin')

            _this.$router.push('/login')
            //window.location.reload();
            _this.$store.dispatch('logout')  
            return;
          }
          _this.$router.push('/home');
        })
      }
    },
    computed:{
      isAllOk(){
        return this.isOk.oldPwd && this.isOk.newPwd && this.isOk.reNewPwd && this.newPwd != this.oldPwd && this.newPwd == this.reNewPwd;
      }
    },
    watch:{
      oldPwd(val){
        this.parmas.oldPwd = val;
        this.isOk.oldPwd = /^.+$/.test(val);
      },
      newPwd(val){
        this.parmas.newPwd = val;
        this.isOk.newPwd = PWD_reg.test(val) && this.oldPwd != val;
      },
      reNewPwd(val){
        this.isOk.reNewPwd = PWD_reg.test(val) && this.newPwd == val;
      }
    },
    created(){
      this.checkLogin()
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  @import "../../../common/style/mixin";
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

  .btn-primary{
    margin-top: 20px;
   width:100%;
   height:56px;
 }
 .icon.right{
  right: 0!important;
  left: auto!important;
 }

.errmsg{
  height: 25px;
  line-height: 25px;
  color: red;
}

.valok{
  color: green;
}
.login-all22{
 position: fixed;
 top:0px;
 width: 100%;
 height:100%;
 @w: 100%;
 @h: 100%;
 .bg-img(@dir, 'bg_big.png', @w, @h);

}

.cancle-modify{
  padding: 10px 0;
  text-align: center;
  margin-top: 10px;
  display: block;
}
.login-wrapper12.eight.wide.column {

    //position: fixed;
    width: 600px;
    
    //height:640px;
    top: 8%;
    //left: 30%;
    //transform: translate(-50%, -70%);

    .login-small-img{

     width:100%;
     height:192px;
     @w: 100%;
     @h: 100%;
     .bg-img(@dir, 'bg_small.png', @w, @h);

     .login-small-img-in{
      font-size: 28px;
      text-align: center;
      color: white;
      line-height:192px;

    }
  }



  form {
    width:100%;
    background-color: white;
    margin:0 auto;
    padding-left:70px;
    padding-right:70px;
    input{
     height:56px;
    }



  .loginme {
    padding-top:30px;
    padding-bottom:24px;
    font-size:20px;
    color:#34495e;
    margin:0 auto;
  }

  .fluid{
    margin-bottom: 10px;
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
