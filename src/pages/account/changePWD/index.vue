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
</script>
<style lang="less">
</style>
