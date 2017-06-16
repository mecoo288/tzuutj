<template>
  <div>
    <myselect @cityUpdate="cityUpdate"></myselect>
    <el-tabs type="border-card" @tab-click="goPage" v-model="activeTag" v-loading.fullscreen.lock="fullscreenLoading">
      <el-tab-pane :label="tab.name" :name="tab.alias" v-for="tab in chartTab">
        <highcharts  :options="tab.options" ref="highcharts"> 
        </highcharts>
      </el-tab-pane>
    </el-tabs>
    <router-view :baseParma="parma" @updateChart="updateChart" ref="child" class="tabs-table"></router-view>
  </div>

</template>

<script>
  import myselect from './components/select.vue';
  import chartConfig from "./data/chartConfig.js";
  export default {
    components: {
      myselect,
    },
    data(){
      return {
        fullscreenLoading: true,
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
    mounted(){
    },
    methods: {
      goPage(tab){
        this.fullscreenLoading = true;
        this.$router.push(this.chartTab[tab.name].link);
      },
      updateChart(chartData){
        let _this = this;
        setTimeout(()=>{
          _this.fullscreenLoading = false;
        },0);
        this.options = {};
        Object.assign(this.options, chartConfig, chartData.options);
        this.chartTab[chartData.tab].options = Object.assign({}, chartConfig, chartData.options)
      },
      cityUpdate(city){
        this.parma.data.cityCode = city.code;
        this.parma.data.type = city.code === 0 ? 1: 2; 
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
  .tabs-chart,
  .tabs-table{
    margin-top: 10px;
  }

  .el-select-dropdown__list{
    width: 470px;
    .el-select-dropdown__item{
      display: inline-block;
    }
  }
</style>
