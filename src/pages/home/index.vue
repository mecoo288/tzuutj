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
    <router-view :baseParma="parma" @updateChart="updateChart" ref="child"></router-view>
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
        options: {},
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
      checkLogin(){
        if(this.$cookie.get('txy_name')==null||this.$cookie.get('txy_token')==null){
          this.$router.push('/login')
        }
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
      let _this = this;
      this.$store.commit('activMenu', 'home');
    }
  }
</script>

<style lang="less">
  @import "../../static/style/mixin.less";
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
