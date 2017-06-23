<template>
  <section class="main-body">
    <el-form :model="params" :rules="rules" ref="params" label-width="80px">
      <el-form-item label="原 密 码" prop="oldPwd">
        <el-input type="password" v-model="params.oldPwd" auto-complete="off" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新 密 码" prop="newPwd">
        <el-input type="password" v-model="params.newPwd" auto-complete="off" placeholder="请输入新密码(6-16位字母和数字,字母区分大小写)"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="reNewPwd">
        <el-input type="password" v-model="params.reNewPwd" placeholder="请确认新密码(6-16位字母和数字,字母区分大小写)" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" :disabled="!isValid">确认修改</el-button>
        <el-button @click="resetForm('params')">重置</el-button>
        <el-button type="text" @click="cancel">取消修改</el-button>
      </el-form-item>
    </el-form>
  </section>
  <!-- <div class="wrapper ui  centered grid" style="margin:0">
    <div class="body">
      <div class="banner">
        土著游统计后台系统
      </div>
      <form class="ui form" @submit.prevent="savePWD">
        <div class="title" ><i class="braille icon"></i> 修改密码</div>

        <div class="ui left icon input fluid field">
          <i class="lock icon"></i>
          <input  type="password" @focus="clearTips" v-model="oldPwd" class="form-control iconlock" placeholder="请输入原密码" ></input>
          <i class="circle outline icon right" :class="{check:isOk.oldPwd, remove:!isOk.oldPwd}" v-if="isfocus.oldPwd"></i>
        </div>

        <div class="ui left icon input fluid field">
          <i class="lock icon"></i>
          <input type="password" @focus="clearTips" class="form-control iconlock" maxlength="16" v-model="newPwd" placeholder="请输入新密码(6-16位字母和数字,字母区分大小写)">
          <i class="circle outline icon right" :class="{check:isOk.newPwd, remove:!isOk.newPwd}" v-if="isfocus.newPwd"></i>
        </div>
        <div class="ui left icon input fluid field">
          <i class="lock icon"></i>
          <input type="password" @focus="clearTips" class="form-control iconlock" maxlength="16" v-model="reNewPwd" placeholder="请重复输入新密码(6-16位字母和数字,字母区分大小写)">
          <i class="circle outline icon right" :class="{check:isOk.reNewPwd, remove:!isOk.reNewPwd}" v-if="isfocus.reNewPwd"></i>
        </div>
        
        <div class="ui red message" v-if="tips">
          <i class="warning circle icon"></i>{{tips}}
        </div>

        <button class="fluid ui button" :class="{primary: isAllOk}" :disabled="!isAllOk || saving">登 录</button>
        <a href="javascript:history.go(-1);" class="cancle-modify">取消修改</a><br>

      </form>

   <div id="footer" >
     <img src="../../../static/imgs/home/logo.png" height="48" width="40">
     上海糖玩国际旅行社有限公司
   </div>

 </div>
</div> -->
</template>
<script>
  let Reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,16}$/;
  export default{
    data(){
      return {
        params: {
          oldPwd: '',
          newPwd: '',
          reNewPwd:'',
        },
        rules: {
          oldPwd: [
          { validator: this.chkOldPWD, trigger: 'blur' }
          ],
          newPwd: [
          { validator: this.chkNewPWD, trigger: 'blur' }
          ],
          reNewPwd: [
          { validator: this.chkReNewPWD, trigger: 'blur' }
          ]
        }
      };
    },
    computed:{
      isValid(){
        return this.params.oldPwd != "" && Reg.test(this.params.newPwd) && Reg.test(this.params.reNewPwd)
      }
    },
    methods: {
      cancel(){
        window.history.back();
      },
      chkOldPWD(rule, value, callback){
        if(value.replace(/\s/g, "") == ""){
          callback(new Error('请输入原密码'));
        }
        callback();
      },
      chkNewPWD(rule, value, callback){
        if(value.replace(/\s/g, "") == ""){
          callback(new Error('请输入新密码'));
          return;
        }
        if(value == this.params.oldPwd){
          callback(new Error('新密码不能与老密码相同'));
          return;
        }
        if(!Reg.test(value)){
          callback(new Error('请输入6-16位字母和数字(字母区分大小写)的新密码'));
          return;
        }
        callback();
      },
      chkReNewPWD(rule, value, callback){
        if(value.replace(/\s/g, "") == ""){
          callback(new Error('请重新输入新密码'));
          return;
        }
        if(value != this.params.newPwd){
          callback(new Error('两次输入密码不同'));
          return;
        }
        callback();
      },
      submitForm(formName) {
        let _this = this;
        this.saving = true;
        this.$store.dispatch('account/Do_changePWD',{
          data: this.params,
          callback({status, data, errmsg}){
            if(status == "0") {
              _this.$message({
                message: errmsg ? errmsg : "登录失败，用户名或密码错误",
                type: 'warning'
              });
              return;
            }
            if(data.code === '50004'){
              _this.$store.dispatch('account/Do_logout')
              return;
            }
            _this.$router.push('/home');
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      if(!this.$locals("account").get()){
        this.$store.dispatch('account/Do_logout', this);
      }
    }
  }
  // const PWD_reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,16}$/;
  // export default{
  //   data(){
  //     return {
  //       oldPwd:'',
  //       newPwd:'',
  //       reNewPwd:'',
  //       tips:'',
  //       params: {
  //         oldPwd:'',
  //         newPwd:'',
  //       },
  //       errmsg: '',
  //       isOk: {
  //         oldPwd: false,
  //         newPwd: false,
  //         reNewPwd: false,
  //       },
  //       isfocus: {
  //         oldPwd: false,
  //         newPwd: false,
  //         reNewPwd: false,
  //       },
  //       saving: false
  //     }
  //   },
  //   methods: {
  //     clearTips(){
  //       this.tips = "";
  //     },
  //     checkLogin(){
  //       if( !(this.$cookie.get('txy_name')!==null && this.$cookie.get('txy_token')!==null) ){
  //         this.$router.push('/login');
  //       }
  //     },

  //     savePWD(){
  //       let _this = this;
  //       this.saving = true;
  //       this.$store.dispatch('doChangePWD', this.params).then(function({body, status, statusText}){
  //         _this.saving = false;
  //         if(status !== 200){
  //           _this.tips = statusText;
  //           return;
  //         }
  //         if(body.code === '50002'){
  //           _this.tips = body.msg;
  //           return;
  //         }
  //         if(body.code === '50004'){
  //           _this.$cookie.delete('txy_name')
  //           _this.$cookie.delete('txy_token')
  //           _this.$cookie.delete('cookieLogin')

  //           _this.$router.push('/login')
  //           //window.location.reload();
  //           _this.$store.dispatch('logout')  
  //           return;
  //         }
  //         _this.$router.push('/home');
  //       })
  //     }
  //   },
  //   computed:{
  //     isAllOk(){
  //       return this.isOk.oldPwd && this.isOk.newPwd && this.isOk.reNewPwd && this.newPwd != this.oldPwd && this.newPwd == this.reNewPwd;
  //     }
  //   },
  //   watch:{
  //     oldPwd(val){
  //       this.params.oldPwd = val;
  //       this.isOk.oldPwd = /^.+$/.test(val);
  //       if(/^.{1,}$/.test(val)) {
  //         this.isfocus.oldPwd = true;
  //       }
  //     },
  //     newPwd(val){
  //       this.params.newPwd = val;
  //       this.isOk.newPwd = PWD_reg.test(val) && this.oldPwd != val;
  //       console.log(this.isOk.newPwd);
  //       if(/^.{1,}$/.test(val)) {
  //         this.isfocus.newPwd = true;
  //       }
  //     },
  //     reNewPwd(val){
  //       this.isOk.reNewPwd = PWD_reg.test(val) && this.newPwd == val;
  //       if(/^.{1,}$/.test(val)) {
  //         this.isfocus.reNewPwd = true;
  //       }
  //     }
  //   },
  //   created(){
  //     this.checkLogin()
  //   }
  // }
</script>
<style rel="stylesheet/less" lang="less">
//   @import "../../../static/style/mixin";
//   @dir: "../../static/imgs/login/";
//   ::-webkit-input-placeholder {
//     color:#aaaaaa !important;
//     font-size:14px;
//   }
//   ::-moz-placeholder {
//     color:#aaaaaa !important;
//     font-size:14px;
//   }
//   :-ms-input-placeholder {
//     color:#aaaaaa !important;
//     font-size:14px;

//   }
//   .wrapper{
//     position: fixed;
//     top:0px;
//     width: 100%;
//     height:100%;
//     @w: 100%;
//     @h: 100%;
//     .bg-img(@dir, 'bg_big.png', @w, @h);
//     .body{
//       padding: 8% 0 10px;
//     }
//     .banner{
//       .bg-img(@dir, 'bg_small.png', @w, @h);
//       width: 600px;
//       height:192px;
//       font-size: 28px;
//       text-align: center;
//       color: white;
//       line-height:192px;
//       height: 192px;
//     }
//     .form {
//       width:100%;
//       background-color: white;
//       margin:0 auto;
//       padding-left:70px;
//       padding-right:70px;
//       padding-bottom: 30px;
//       input{
//        height:56px;
//      }
//      .button{
//       height: 50px;
//       margin-top: 20px;
//      }
//      .remenberMe{
//       display: block;
//       text-align: left;
//      }
//      .title {
//       padding-top:30px;
//       padding-bottom:24px;
//       font-size:24px;
//       text-align: left;
//       color:#34495e;
//       margin:0 auto;
//     }
//   }
//   .valok{
//     left: inherit!important;
//     right: 0!important;
//   }
//   .cancle-modify{
//     padding: 10px 0;
//     text-align: center;
//     margin-top: 10px;
//     display: block;
//   }
// }

// #footer{
//   padding-top:40px;
//   text-align:center;
//   color:white; 
//   position:absolute;
//   left:30%;
//   top:80%;
//   bottom:3%;
// }
</style>
