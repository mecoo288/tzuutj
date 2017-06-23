<template>
  <div>
    <section class="main-body">
      <el-form :model="params" @ label-width="100px">
        <el-form-item label="用户名">
          <el-input type="text" v-model="params.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="params.passWd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" class="submitBtn" @click="doLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        params:{
          name: "",
          passWd: "",
        },
        name: "",
        passWd:"",
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
        this.params.name = val;
        this.isOk.name = /^.{2,}$/.test(val);
      },
      passWd(val, oldVal){
        this.params.passWd = val;
        this.isOk.passWd = /^.{6,}$/.test(val);
      }
    },
    methods: {
      myfocus(){
      },
      doLogin(){
        let _this = this;
        this.$store.dispatch('account/Do_login', {
          data: _this.params,
          callback({status, data, errmsg}){
            if(status == "0") {
              _this.$message({
                message: errmsg ? errmsg : "登录失败，用户名或密码错误",
                type: 'warning'
              });
              return;
            }
            _this.$locals("account").add({account: _this.params.name, token: data.token});
            _this.goHome();
          }
        })
      },
      goHome(){
        this.$router.push('/home')
      }
    },
    created(){
      let _this= this;
      if(this.$locals("account").get()){
        this.goHome();
      }
      this.$store.commit('needLogged', true);
      
    }

  }
</script>
<style lang="less">
  
</style>
