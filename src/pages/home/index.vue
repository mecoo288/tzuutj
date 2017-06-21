<template>
  <div>
    <el-form :inline="true" :model="parma" class="demo-form-inline">
      <el-form-item>
        <sel-city @change="cityChange"></sel-city>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" @tab-click="goPage" v-model="activeTag">
      <el-tab-pane :label="tab.name" :name="tab.alias" v-for="tab in chartTab">
        <highcharts  :options="tab.options" ref="highcharts"> 
        </highcharts>
      </el-tab-pane>
    </el-tabs>
    <router-view :baseParma="parma" @updateChart="updateChart" ref="child" class="tabs-table"></router-view>
  </div>

</template>

<script>
  import selCity from '../components/citys/';
  import {chartConfig} from "../data/config.js";
  export default {
    components: {
      selCity,
    },
    data(){
      return {
        chartTab:{
          total: {
            alias:'total',
            name:'总图表',
            link: '/home/total',
            options: {}
          },
          order: {
            alias:'order',
            name:'订单图表',
            link: '/home/order',
            options: {}
          },
          provider: {
            alias:'provider',
            name:'服务者图表',
            link: '/home/provider',
            options: {}
          },
        },
        parma:{
          type: this.activeTag,
          data: {
            cityCode: 0,
            type: 1,
          }
        }
      }
    },
    computed:{
      activeTag(){
        return this.$store.state.home.activedTag
      }
    },
    created(){
      Object.assign(this.options, chartConfig);
    },
    methods: {
      goPage(tab){
        this.$router.push(this.chartTab[tab.name].link);
      },
      updateChart(chartData){
        let _this = this;
        this.options = {};
        Object.assign(this.options, chartConfig, chartData.options);
        this.chartTab[chartData.tab].options = Object.assign({}, chartConfig, chartData.options)
      },
      cityChange(city){
        this.parma.data.cityCode = city.code;
        this.parma.data.type = city.code === 0 ? 1: 2; 
      },
      queryData(){
        this.$refs.child.cityChange( this.parma.data );
      }
    },
    created(){
      let _this = this;
      this.$store.commit('activMenu', 'home');
    }
  }
</script>

<style lang="less">
  .tabs-table{
    margin-top: 10px;
  }
</style>
