<template>
  <div>
    <!-- <div id="home">
      <myselect></myselect>
    </div> -->
    <div class="ui  seven item menu">
      <a class="item" :class="{active: activeTag == tab.alias}"  v-for="tab in chartTab" :href="'#/home/'+tab.alias"  @click='updateByType(tab.alias)'>
        {{tab.name}}
      </a>
    </div>
    <div id="table">
      <mytable :threeType="activeTag" ref="updateTable"></mytable>
    </div>
  </div>

</template>

<script>
import myselect from './select'
import mytable from './base_table'
  export default {
    components: {
      myselect,
      mytable
    },
    data(){
      return {
        chartTab:[
          {
            alias:'total',
            name:'总图表'
          },{
            alias:'order',
            name:'订单图表'
          },{
            alias:'provider',
            name:'服务者图表'
          },
        ],
        activeTag: 'total',
     }
   },
   created(){

   },
   methods: {
    updateByType(type){
      this.activeTag = type;
      this.$refs.updateTable.update( type );
    }
   },
   mounted(){
      this.updateByType(this.$route.path.split("/").pop());
        //登录校验 最终在server端做
        if(this.$cookie.get('txy_name')==null||this.$cookie.get('txy_token')==null){

          this.$router.push('/login')
        }
      }

    }
  </script>

  <style rel="stylesheet/less" lang="less">
  //@import "../../static/style/index";
  @import "../../../common/style/mixin";
  @dir: "static/imgs/login/";  

  .homemain{
    margin-top:86px;
  }
  .apploginme {

    position: fixed;
    width: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);

  }

</style>
