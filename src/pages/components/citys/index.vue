<template>
  <el-form :inline="true" :model="selCity">
    <el-form-item label="选择城市">
      <el-select v-model="selCity.__city" @change="change" filterable clearable placeholder="请选择城市（默认全部）" popper-class="block_select">
        <el-option-group  label="选择城市">
          <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item">
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
        citys:[],
        selCity:{
          name: "全部",
          __city: {
            code:0,
            name:'全部'
          },
          code:0
        }
      }
    },
    mounted(){
      let _this = this;
      this.$store.dispatch('home/GET_city', {
        callback({status, errmsg, data, code}){
          if(status != 1){
          this.$message({type:"warnign", message: errmsg});
          return;
        }
        _this.citys = data;
        }
      })
    },
    methods:{
      change(city){
        this.$emit('change', {name: city.name, code: city.code});
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