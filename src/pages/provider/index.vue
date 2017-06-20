<template>
  <div v-loading.lock="isLoading">
    <el-form :inline="true" :model="parma" class="demo-form-inline">
      <el-form-item>
        <sel-city @change="cityChange"></sel-city>
      </el-form-item>
      <el-form-item label="筛选日期">
        <el-date-picker :editable="false" v-model="parma.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportData">导出</el-button>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" v-model="activedTab" @tab-click="Do_activeTab">
      <el-tab-pane name="provider" label="服务者数量">
        <highcharts  :options="provider.options" ref="highcharts"> 
        </highcharts>
      </el-tab-pane>
      <el-tab-pane name="newProvider" label="当日新增服务者数量">
        <highcharts  :options="newProvider.options" ref="highcharts"> 
        </highcharts>
      </el-tab-pane>
      <el-tab-pane name="online" label="上线状态人数">
        <highcharts  :options="online.options" ref="highcharts"> 
        </highcharts>
      </el-tab-pane>
      <el-tab-pane name="offline" label="下线状态人数">
        <highcharts  :options="offline.options" ref="highcharts"> 
        </highcharts>
      </el-tab-pane>
      <el-tab-pane name="follow" label="已关注服务者人数">
        <highcharts  :options="follow.options" ref="highcharts"> 
        </highcharts>
      </el-tab-pane>
      <el-tab-pane name="noFollow" label="未关注服务者人数">
        <highcharts  :options="noFollow.options" ref="highcharts"> 
        </highcharts>
      </el-tab-pane>
    </el-tabs>

    <el-table :data="data" style="width: 100%; margin-top:10px" stripe>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="total" label="服务者数量"></el-table-column>
      <el-table-column prop="newbie" label="当日新增数量"></el-table-column>
      <el-table-column prop="online" label="上线状态人数"></el-table-column>
      <el-table-column prop="offline" label="下线状态人数"></el-table-column>
      <el-table-column prop="follow" label="已关注服务者人数"></el-table-column>
      <el-table-column prop="unconcern" label="未关注服务者人数"></el-table-column>
    </el-table>
    <el-pagination v-if="hasMore && parma.dateStart" :current-page.sync="parma.page" :page-size="pageSize" @current-change="pageChange" layout="total, prev, pager, next" :total="total" class="pagination">
      </el-pagination>
  </div>
</template>

<script>
  import {Divide} from "../../filters/";
  import {calConfig, chartConfig} from "../data/config.js";
  import selCity from "../components/citys/";
  export default {
    components:{
      selCity
    },
    data(){
      return {
        isLoading: false,
        Query:{}, /*url query*/
        calConfig:calConfig,
        parma:{
          __dateRange:[],
          cityCode:0,
          dateStart:"",
          dateEnd:"",
          page: 1,
          no_page:1,
        },
        data:[],
        total: 2000,
        pageSize: 20,
        hasMore: false,
        provider:{
          options: Object.assign({},chartConfig)
        },
        newProvider:{
          options: Object.assign({},chartConfig)
        },
        follow:{
          options: Object.assign({},chartConfig)
        },
        noFollow:{
          options: Object.assign({},chartConfig)
        },
        online:{
          options: Object.assign({},chartConfig)
        },
        offline:{
          options: Object.assign({},chartConfig)
        },
      }
    },
    computed:{
      activedTab(){
        return this.Query.to || "provider";
      },
    },
    filters:{
      Divide
    },
    methods:{
      Do_activeTab({name, ...ot}){
        this.Go_tag({to:name});
      },
      Go_tag(query){
        this.Query = query;
        this.goPage(query);
      },
      goPage(query){
        this.$router.push({path:'/provider', query:query})
        this.Query = query;
      },
      render(){
        let _this = this;
        // this.isLoading = true;
        this.$store.dispatch('provider/GET_provider', {
          data: this.parma,
          callback({status, errmsg, data}){
            _this.isLoading = false;
            if(status != "1"){
              _this.$message.error(errmsg);
              return
            }
            _this.data = data.list;
            _this.total = data.total;
            _this.pageSize = data.length;
            _this.hasMore = data.hasMore;
            _this.updateChart();
          }
        })
      },
      updateChart(){
        if(this.parma.page !== 1){
          return;
        }
        let provider = [],
            newProvider = [],
            follow = [],
            noFollow = [],
            online = [],
            offline  = [];
        this.data.forEach((item)=>{
          provider.push([item.date, item.total]);
          newProvider.push([item.date, item.newbie])
          follow.push([item.date, item.follow])
          noFollow.push([item.date, item.unconcern])
          online.push([item.date, item.online])
          offline.push([item.date, item.offline])
        });
        console.log(online, offline)
        this.provider.options.series[0].data = provider;
        this.newProvider.options.series[0].data = newProvider;
        this.follow.options.series[0].data = newProvider;
        this.noFollow.options.series[0].data = newProvider;
        this.online.options.series[0].data = newProvider;
        this.offline.options.series[0].data = newProvider;
      },
      setDate(date){
        let [start="", end=""] = date.split(" - ");
        this.parma.dateStart = start;
        this.parma.dateEnd = end;
      },
      search(){
        this.parma.page = 1;
        this.render();
      },
      exportData(){

      },
      pageChange(page){
        this.parma.page = page;
        this.render();
      },
      cityChange(city){
        this.parma.cityCode = city.code;
      }
    },
    created(){
      this.Query = this.$route.query;
      this.$store.commit('activMenu', 'provider');
      this.render();
    }
  }
</script>

<style lang="less">
  .pagination{
    margin-top: 20px;
    display: block;
    text-align: center;
  }
</style>
