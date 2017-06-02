<template>
  <div>
    <myselect @cityUpdate="cityUpdate"></myselect>
    <div class="ui  seven item menu">
      <a class="item" :class="{active: activeTag == tab.alias}"  v-for="tab in chartTab" :href="'#/home/'+tab.alias">
        {{tab.name}}
      </a>
    </div>
    <highcharts  :options="options" ref="highcharts">
    </highcharts>
    <router-view :baseParma="parma" @updateType= "updateByType" @updateChart="updateChart" ref="child"></router-view>
  </div>

</template>

<script>
import myselect from './select';
import chartConfig from "./data/chartConfig.js";
import {mapMutations} from 'vuex'
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
        parma:{
          type: 'total',
          data: {
            cityCode: 0,
            type: 1,
          }
        }
     }
   },
   created(){
    Object.assign(this.options, chartConfig);
   },
   methods: {
    ...mapMutations([
      'activMenu'
    ]),
    checkLogin(){
      if(this.$cookie.get('txy_name')==null||this.$cookie.get('txy_token')==null){
        this.$router.push('/login')
      }
    },
    updateByType(type){
      this.checkLogin();
      this.activeTag = type;
      this.parma.type = type;
      // this.$refs.child.cityChange( this.parma.data );
      // this.$refs.updateTable.update( type );
    },
    updateChart(chartData){
      this.options = {};
      Object.assign(this.options, chartConfig, chartData);
    },
    cityUpdate(city){
      this.checkLogin();
      this.parma.data.cityCode = city.code;
      this.parma.data.type = city.code === 0 ? 1: 2; 
      this.$refs.child.cityChange( this.parma.data );
    }
   },
    created(){
      this.activMenu('home');
      this.updateByType(this.$route.path.split("/").pop());
    }
  }
  </script>

  <style rel="stylesheet/less" lang="less">
  @import "../../common/style/mixin.less";
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
