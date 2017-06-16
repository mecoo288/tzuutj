<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="选择城市">
        <el-select v-model="form.selCity.code" filterable placeholder="请选择城市（默认全部）">
          <el-option-group  label="选择城市">
            <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-option-group>
        </el-select>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default{
    data(){
      return {
        region_name:"全国",
        citys:[],
        form:{
          selCity:{
            type:1,
            code:0
          }
        }
      }
    },
    mounted(){
      let _this = this;
      this.$store.dispatch('home/GET_city', {
        callback({status, errmsg, data, code}){
          if(status != 1){
          alert(errmsg);
          return;
        }
        _this.citys = data;
        }
      })
    },
    methods:{
      query(){
        console.log(this.form.selCity);
        
        this.$emit('cityUpdate', this.form.selCity)
      },
    },
  }
</script>
<style rel="stylesheet/less" lang="less">
</style>