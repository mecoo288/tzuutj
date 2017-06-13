<template>
  <div class="filter-bar">
    <el-select v-model="selCity.name" filterable placeholder="请选择城市（默认全部）" @change="DoSelCity">
      <el-option-group  label="选择城市">
        <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code">
        </el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default{
    data(){
      return {
        region_name:"全国",
        citys:[],
        selCity:{
          name:'',
          type:1,
          code:""
        }
      }
    },
    mounted(){
      let _this = this;
      $('.ui.dropdown').dropdown({
        on: 'hover'
      });
      this.$store.dispatch('home/GET_city').then(function({status, errmsg, data, code}){
        if(status != 1){
          alert(errmsg);
          return;
        }
        _this.citys = data;
      })
    },
    methods:{
      DoSelCity(code){
        if(this.selCity.code === code ){
          return;
        }
        Object.assign(this.selCity, {code: code}, {type: code === 0 ? 1 : 2});
        this.$emit('cityUpdate', this.selCity)
      },
    },
  }
</script>
<style rel="stylesheet/less" lang="less">
  .filter-bar{

  }
</style>