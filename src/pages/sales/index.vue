<template>
  <div v-loading.lock="isLoading">
    <el-form :inline="true" :model="rank.params" class="demo-form-inline">
      <el-form-item>
        <sel-city @change="cityChange"></sel-city>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activedTab" type="border-card" @tab-click="Do_activeTab">
      <el-tab-pane label="服务者管理统计表" name="report">
        <template v-if="report.params.type == 1">
          <el-table :data="report.data" style="width: 100%" stripe>
            <el-table-column prop="recruit_name" label="姓名">
              <template scope="scope">
                <el-button @click="viewItem(scope.row)" type="text">{{scope.row.recruit_name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="fwz_id" label="ID"></el-table-column>
            <el-table-column prop="fwz_recruit_num" label="服务者总数"></el-table-column>
            <el-table-column prop="fwz_focus_num" label="关注服务者总数"></el-table-column>
            <el-table-column label="关注服务者比例">
              <template scope="scope">
                {{ scope.row.fwz_focus_num | divide(scope.row.fwz_recruit_num) }}
              </template>
            </el-table-column>
            <el-table-column prop="fwz_online_num" label="上线服务者总数"></el-table-column>
            <el-table-column label="上线服务者比例">
              <template scope="scope">
                {{ scope.row.fwz_online_num | divide(scope.row.fwz_recruit_num) }}
              </template>
            </el-table-column>
            <el-table-column prop="fwz_hasorder_num" label="成单服务者总数"></el-table-column>
            <el-table-column label="成单服务者比例">
              <template scope="scope">
                {{ scope.row.fwz_hasorder_num | divide(scope.row.fwz_recruit_num) }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="" width="100">
              <template scope="scope">
                <el-button @click="viewItem(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column> -->
          </el-table>
          <el-pagination v-if="report.hasMore" :current-page.sync="report.params.page" :page-size="report.pageSize" @current-change="pageChange" layout="total, prev, pager, next" :total="report.total" class="pagination">
          </el-pagination>
        </template>
      </el-tab-pane>

      <el-tab-pane label="BD每日统计表" name="rank">
        <el-form :inline="true" :model="rank.params" class="demo-form-inline">
          <el-form-item label="筛选日期">
            <el-date-picker :editable="false" v-model="rank.params.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="rank.data" style="width: 100%" stripe>
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="recruit_name" label="姓名"></el-table-column>
          <el-table-column prop="recruit_id" label="ID"></el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="order_num" sortable label="成单数"></el-table-column>
          <el-table-column sortable label="成单金额(元)">
            <template scope="scope">
              {{scope.row.money_sum | coin2yuan('')}}
            </template>
          </el-table-column>
          <el-table-column prop="fwz_hasorder_num" sortable label="成单服务者数"></el-table-column>
          <el-table-column prop="fwz_focus_num" sortable label="关注服务者数"></el-table-column>
          <el-table-column prop="fwz_online_num" sortable label="上线服务者数"></el-table-column>
          <el-table-column prop="fwz_recruit_num" sortable label="开拓服务者数"></el-table-column>
        </el-table>
        <el-pagination v-if="rank.hasMore" :current-page.sync="rank.params.page" :page-size="rank.pageSize" @current-change="pageChange" layout="total, prev, pager, next" :total="rank.total" class="pagination">
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane label="BD业绩查询" name="query">
        <el-form :inline="true" :model="query.params" class="demo-form-inline">
          <el-form-item label="筛选日期">
            <el-date-picker :editable="false" v-model="query.params.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="query.data" style="width: 100%" stripe>
          <el-table-column prop="recruit_name" label="姓名"></el-table-column>
          <el-table-column prop="money_sum" label="成单金额(元)"></el-table-column>
          <el-table-column prop="order_num" label="成单数"></el-table-column>
          <el-table-column prop="refund_money" label="退单金额(元)"></el-table-column>
          <el-table-column prop="refund_num" label="退单数"></el-table-column>
        </el-table>
        <el-pagination v-if="query.hasMore" :current-page.sync="query.params.page" :page-size="query.pageSize" @current-change="pageChange" layout="total, prev, pager, next" :total="query.total" class="pagination">
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane label="周报明细" name="weekly">
        <el-form :inline="true" :model="weekly.params" class="demo-form-inline">
          <el-form-item label="筛选日期">
            <el-date-picker :editable="false" v-model="weekly.params.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="请选择BD姓名">
            <el-select v-model="weekly.params.recruitId" placeholder="请选择">
              <el-option key="" label="全部" value=""></el-option>
              <el-option v-for="bd in bdNames" :key="bd.id" :label="bd.name" :value="bd.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportData" :disabled="weeklyExport">导出</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="weekly.data" style="width: 100%" stripe>
          <el-table-column prop="recruit_name" label="姓名"></el-table-column>
          <el-table-column label="成单金额(元)">
            <template scope="scope">
              {{scope.row.money_sum | coin2yuan('')}}
            </template>
          </el-table-column>
          <el-table-column prop="order_num" label="成单数"></el-table-column>
          <el-table-column label="退单金额(元)">
            <template scope="scope">
              {{scope.row.refund_money | coin2yuan('')}}
            </template>
          </el-table-column>
          <el-table-column prop="refund_num" label="退单数"></el-table-column>
        </el-table>
        <el-pagination v-if="weekly.hasMore" :current-page.sync="weekly.params.page" :page-size="weekly.pageSize" @current-change="pageChange" layout="total, prev, pager, next" :total="weekly.total" class="pagination">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  import {Divide, coin2yuan} from "../../filters/";
  import {calConfig} from "../data/config.js";
  import selCity from "../components/citys/";
  export default {
    components:{
      selCity
    },
    data(){
      return {
        isLoading: false,
        Query:{}, /*url query*/
        baseParma:{
          cityCode: 0
        },
        calConfig:calConfig,
        report:{
          params:{
            page: 1,
            type: 1
          },
          data:[],
          total: 0,
          pageSize: 20,
          hasMore: false,
        },
        bdNames:[],
        bdIsOk: false,
        rank:{
          params:{
            __dateRange:[],
            page: 1,
            dateStart:"",
            dateEnd:"",
          },
          data:[],
          total: 0,
          pageSize: 20,
          hasMore: false,
        },
        query:{
          params:{
            __dateRange:[],
            page: 1,
            dateStart:"",
            dateEnd:"",
          },
          data:[],
          total: 0,
          pageSize: 20,
          hasMore: false,
        },
        weekly:{
          params:{
            __dateRange:[],
            page: 1,
            recruitId:"",
            dateStart:"",
            dateEnd:"",
          },
          data:[],
          total: 0,
          pageSize: 20,
          hasMore: false,
          searched :false,
        }
      }
    },
    computed:{
      activedTab(){
        return this.Query.to || "report";
      },
      weeklyExport(){
        return !(this.weekly.params.dateStart && this.weekly.searched && this.weekly.total > 0 )
      }
    },
    filters:{
      Divide,
      coin2yuan,
    },
    methods:{
      Do_activeTab({name, ...ot}){
        this.Go_tag({to:name});
      },
      Go_tag(query){
        this.Query = query;
        this.goPage(query);
      },
      viewItem({recruit_id, recruit_name}){
        this.$router.push({path:'/sales/'+ recruit_name + "__" + recruit_id})
      },
      goPage(query){
        this.$router.push({path:'/sales', query:query})
        this.Query = query;
        if(this.activedTab == "report"){
          this.render()
        }
      },
      render(){
        let _this = this;
        this.fixParma();
        this.isLoading = true;
        this.$store.dispatch('sales/GET_'+this.activedTab, {
          data: Object.assign({}, _this[this.activedTab].params, _this.baseParma),
          callback({status, errmsg, data}){
            _this.isLoading = false;
            if(status != "1"){
              _this.$message.error(errmsg);
              return
            }
            if(_this.activedTab == "weekly"){
              _this.weekly.searched = true;
            }
            _this[_this.activedTab].data = data.list;
            _this[_this.activedTab].total = data.total;
            _this[_this.activedTab].pageSize = data.length;
            _this[_this.activedTab].hasMore = data.hasMore;
          }
        })
      },
      fixParma(){
        this.Query.to = this.activedTab;
        if(this.activedTab === "weekly" && !this.bdIsOk){
          this.getBd()
        };
      },
      setDate(date){
        if(this.activedTab == "weekly"){
          this.weekly.searched = false;
        }
        let [start="", end=""] = date.split(" - ");
        this[this.activedTab].params.dateStart = start;
        this[this.activedTab].params.dateEnd = end;
      },
      queryData(){
        this.render();
      },
      exportData(){
        let _this = this;
        this.$store.dispatch('download/Do_download_weekly',{
          data: this.weekly.params,
          callback({status, errmsg, data}){
            if(status != "1"){
              _this.$message.error(errmsg);
              return
            }
            _this.$store.commit('download/DONE_downLoad', {
              that: _this,
              type: 50000,
              title: "BD销售统计导出提示",
              message: _this.weekly.params.dateStart + " 至 " + _this.weekly.params.dateEnd + '的报表文件正在生成请至下载中心下载'
            })
          }
        })
      },
      pageChange(page){
        this[this.activedTab].params.page = page;
        this.render();
      },
      cityChange(city){
        this.baseParma.cityCode = city.code;
        this.render();
      },
      getBd(){
        let _this = this;
        this.isLoading = true;
        this.$store.dispatch('sales/GET_bdName', {
          data: _this.baseParma,
          callback({status, errmsg, data}){
            _this.isLoading = false;
            if(status != "1"){
              _this.$message.error(errmsg);
              return
            }
            _this.bdNames = data;
            _this.bdIsOk = true;
          }
        })
      }
    },
    created(){
      this.Query = this.$route.query;
      this.$store.commit('activMenu', 'sales');
      if(this.activedTab == "report"){
        this.render()
      }
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
