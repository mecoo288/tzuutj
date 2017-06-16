<template>
  <el-form :inline="true" :model="form">
    <el-form-item label="选择城市">
      <el-select v-model="form.selCity.code" @change="change" filterable placeholder="请选择城市（默认全部）" popper-class="block_select">
        <el-option-group  label="选择城市">
          <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-option-group>
      </el-select>
    </el-form-item>
  </el-form>
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
      change(){
        this.$emit('change', this.form.selCity)
      },
    },
  }
</script>
<style rel="stylesheet/less" lang="less">
  .block_select{
    .el-select-dropdown__list{
      width: 470px;
      .el-select-dropdown__item{
        display: inline-block;
      }
    }
  }
</style>