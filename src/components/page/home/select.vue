<template>
  <div class="myselect">

    <div class ="mysecond ui  column grid">
      <div class="xzcstext">    
        选择城市:
      </div>
      <div class="myregion">
        <myregion firstType="Dd"></myregion>
      </div>
      <div class="myexport" >
        <div class="myexbutton" @click="exportdata">导出</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import mydate from "./common/date";
  import myregion from "./common/region_common";

  export default{
    data(){
      return {
        province_name:"请选择",
        city_name:"请选择",
        region_name:"全国",
        citys:[],
      }
    },
    mounted(){

    },
    methods:{
      exportdata(){
        this.$store.dispatch('download',{type:'dd',name:'订单'})
      }
    },
    components:{
      mydate,
      myregion
    }
  }
</script>
<style rel="stylesheet/less" lang="less">

</style>