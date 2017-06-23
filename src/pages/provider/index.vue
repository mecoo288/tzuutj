<template>
  <div v-loading.lock="isLoading">
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item>
        <sel-city @change="cityChange"></sel-city>
      </el-form-item>
      <el-form-item label="筛选日期">
        <el-date-picker :editable="false" v-model="params.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="exportData" :disabled="canExport">导出</el-button>
      </el-form-item> -->
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
    <el-pagination v-if="hasMore && params.dateStart" :current-page.sync="params.page" :page-size="pageSize" @current-change="pageChange" layout="total, prev, pager, next" :total="total" class="pagination">
    </el-pagination>
  </div>
</template>

<script>
  import {Divide} from "../../filters/";
  import {calConfig, chartConfig} from "../data/config.js";
  import selCity from "../components/citys/";
  let config = JSON.stringify(chartConfig);
  export default {
    components:{
      selCity
    },
    data(){
      return {
        isLoading: true,
        Query:{}, /*url query*/
        calConfig:calConfig,
        searched: false,
        params:{
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
          options: Object.assign(JSON.parse(config), {
            title: {
              text: '服务者数量'
            },
            yAxis:[{
              title:{
                text:"(单位/人)"
              },
              labels: {
                format: '{value}'
              }
            }],
          })
        },
        newProvider:{
          options: Object.assign(JSON.parse(config), {
            title: {
              text: '当日新增服务者数量'
            },
            yAxis:[{
              title:{
                text:"(单位/人)"
              },
              labels: {
                format: '{value}'
              }
            }],
          })
        },
        follow:{
          options: Object.assign(JSON.parse(config), {
            title: {
              text: '已关注服务者人数'
            },
            yAxis:[{
              title:{
                text:"(单位/人)"
              },
              labels: {
                format: '{value}'
              }
            }],
          })
        },
        noFollow:{
          options: Object.assign(JSON.parse(config), {
            title: {
              text: '未关注服务者人数'
            },
            yAxis:[{
              title:{
                text:"(单位/人)"
              },
              labels: {
                format: '{value}'
              }
            }],
          })
        },
        online:{
          options: Object.assign(JSON.parse(config), {
            title: {
              text: '上线状态人数'
            },
            yAxis:[{
              title:{
                text:"(单位/人)"
              },
              labels: {
                format: '{value}'
              }
            }],
          })
        },
        offline:{
          options: Object.assign(JSON.parse(config), {
            title: {
              text: '下线状态人数'
            },
            yAxis:[{
              title:{
                text:"(单位/人)"
              },
              labels: {
                format: '{value}'
              }
            }],
          })
        },
      }
    },
    computed:{
      activedTab(){
        return this.Query.to || "provider";
      },
      canExport(){
        return !(this.params.dateStart && this.searched && this.total>0)
      }
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
        this.isLoading = true;
        this.searched = false;
        this.$store.dispatch('provider/GET_provider', {
          data: this.params,
          callback({status, errmsg, data}){
            _this.isLoading = false;
            _this.searched = true;
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
        if(this.params.page !== 1){
          return;
        }
        let providerArr = [],
        newProviderArr = [],
        followArr = [],
        noFollowArr = [],
        onlineArr = [],
        offlineArr  = [];
        this.data.forEach(({date, total, newbie, follow, unconcern, online, offline})=>{
          date = Date.parse(date);
          providerArr.unshift([date, total]);
          newProviderArr.unshift([date, newbie])
          followArr.unshift([date, follow])
          noFollowArr.unshift([date, unconcern])
          onlineArr.unshift([date, online])
          offlineArr.unshift([date, offline])
        });
        this.provider.options.series[0].data = providerArr;
        this.newProvider.options.series[0].data = newProviderArr;
        this.follow.options.series[0].data = followArr;
        this.noFollow.options.series[0].data = noFollowArr;
        this.online.options.series[0].data = onlineArr;
        this.offline.options.series[0].data = offlineArr;
      },
      setDate(date){
        this.searched = false;
        let [start="", end=""] = date.split(" - ");
        this.params.dateStart = start;
        this.params.dateEnd = end;
      },
      search(){
        this.params.page = 1;
        this.render();
      },
      exportData(){
        let _this = this;
        this.$store.dispatch('download/Do_download_provider',{
          data: this.params,
          callback({status, errmsg, data}){
            if(status != "1"){
              _this.$message.error(errmsg);
              return
            }
            _this.$store.commit('download/DONE_downLoad', {
              that: _this,
              type: 56000,
              title: "服务者统计导出提示",
              message: _this.params.dateStart + " 至 " + _this.params.dateEnd + '的报表文件正在生成请至下载中心下载'
            })
          }
        })
      },
      pageChange(page){
        this.params.page = page;
        this.render();
      },
      cityChange(city){
        this.searched = false;
        this.params.cityCode = city.code;
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
