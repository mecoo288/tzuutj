<template>
  <div>
    <myselect></myselect>
    <div class="ui  seven item menu">
      <a class="item" :class="{active: activeTag == tab.alias}"  v-for="tab in chartTab" :href="'#/home/'+tab.alias"  @click='updateByType(tab.alias)'>
        {{tab.name}}
      </a>
    </div>
    <highcharts  :options="options" ref="highcharts">
    </highcharts>
    <router-view :baseData="{a:11}" @updateType= "updateByType" @updateChart="updateChart"></router-view>
  </div>

</template>

<script>
import myselect from './select';
import chartConfig from "./data/chartConfig.js";

  export default {

    components: {
      myselect,
      // mytable
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
        options: {},
     }
   },
   created(){
    Object.assign(this.options, chartConfig);
   },
   methods: {
    updateByType(type){
      this.activeTag = type;
      // this.$refs.updateTable.update( type );
    },
    updateChart(chartData){
      console.log(this.options, 111111);
      this.options = {};
      Object.assign(this.options, chartConfig, chartData);
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
