<template>
  <div>
    <el-tabs v-model="activedTab" type="border-card" @tab-click="Do_activeTab">
      <el-tab-pane label="服务者管理统计表" name="report">
        <el-table :data="report.data" style="width: 100%" stripe>
          <el-table-column prop="fwz_name" label="姓名"></el-table-column>
          <el-table-column prop="fwz_id" label="ID"></el-table-column>
          <el-table-column prop="fwz_recruit_num" label="服务者总数"></el-table-column>
          <el-table-column prop="fwz_focus_num" label="关注服务者总数"></el-table-column>
          <el-table-column label="关注服务者比例">
            <template scope="scope">
              {{ scope.row.fwz_focus_num | divide(scope.row.fwz_recruit_num) }}
            </template>
          </el-table-column>
          <el-table-column prop="fwz_online_num" label="上线服务者总数"></el-table-column>
          <!-- <el-table-column prop="fwz_online_num/fwz_recruit_num" label="上线服务者比例"></el-table-column> -->
          <el-table-column prop="fwz_hasorder_num" label="成单服务者总数"></el-table-column>
          <!-- <el-table-column prop="fwz_hasorder_num/fwz_recruit_num" label="成单服务者比例"></el-table-column> -->
          <el-table-column label="" width="100">
            <template scope="scope">
              <el-button @click="goPage" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="BD每日统计表" name="rank">
        <el-form :inline="true" :model="rank.parma" class="demo-form-inline">
          <el-form-item label="筛选日期">
            <el-date-picker :editable="false" v-model="rank.parma.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="dateOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="rank.data" style="width: 100%" stripe>
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="fwz_name" label="姓名"></el-table-column>
          <el-table-column prop="fwz_id" label="ID"></el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="order_num" label="成单数"></el-table-column>
          <el-table-column prop="money_sum" label="成单金额"></el-table-column>
          <el-table-column prop="fwz_hasorder_num" label="成单服务者数"></el-table-column>
          <el-table-column prop="fwz_focus_num" label="关注服务者数"></el-table-column>
          <el-table-column prop="fwz_online_num" label="上线服务者数"></el-table-column>
          <el-table-column prop="fwz_recruit_num" label="开拓服务者数"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="BD业绩查询" name="query">
        <el-form :inline="true" :model="query.parma" class="demo-form-inline">
          <el-form-item label="筛选日期">
            <el-date-picker :editable="false" v-model="query.parma.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="dateOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
          <el-table :data="query.data" style="width: 100%" stripe>
            <el-table-column prop="fwz_name" label="姓名"></el-table-column>
            <el-table-column prop="money_sum" label="成单金额"></el-table-column>
            <el-table-column prop="order_num" label="成单数"></el-table-column>
            <el-table-column prop="refund_money" label="退单金额"></el-table-column>
            <el-table-column prop="refund_num" label="退单数"></el-table-column>
          </el-table>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="周报明细" name="weekly">
        <el-form :inline="true" :model="weekly.parma" class="demo-form-inline">
          <el-form-item label="筛选日期">
            <el-date-picker :editable="false" v-model="weekly.parma.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="dateOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="请选择BD姓名">
            <el-select v-model="weekly.parma.bdName" placeholder="请选择">
              <el-option
                v-for="bd in bdNames"
                :key="bd.value"
                :label="bd.label"
                :value="bd.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="weekly.data" style="width: 100%" stripe>
          <el-table-column prop="fwz_name" label="姓名"></el-table-column>
          <el-table-column prop="money_sum" label="成单金额"></el-table-column>
          <el-table-column prop="order_num" label="成单数"></el-table-column>
          <el-table-column prop="refund_money" label="退单金额"></el-table-column>
          <el-table-column prop="refund_num" label="退单数"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>

</template>

<script>
  import {Divide} from "../../filters/";
  export default {
    data(){
      return {
        Query:{}, /*url query*/
        report:{
          parma:{},
          data:[]
        },
        dateOptions:{
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        bdNames:[],
        rank:{
          parma:{
            __dateRange:[],
            dateStart:"",
            dateEnd:"",
          },
          data:[],
        },
        query:{
          parma:{
            __dateRange:[],
            dateStart:"",
            dateEnd:"",
          },
          data:[],
        },
        weekly:{
          parma:{
            __dateRange:[],
            dateStart:"",
            dateEnd:"",
          },
          data:[],
        }
      }
    },
    computed:{
      activedTab(){
        return this.Query.to || "report";
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
        this.render();
      },
      goPage(query){
        this.$router.push({path:'/sales', query:query})
      },
      render(){
        let _this = this;
        this.fixParma();
        this.$store.dispatch('sales/GET_'+this.activedTab, {
          data: _this[this.activedTab].parma,
          callback({status, errmsg, data}){
            if(status != "1"){
              _this.$message.error(errmsg);
              return
            }
            _this[_this.activedTab].data = data.list;
          }
        })
      },
      fixParma(){
        this.Query.to = this.activedTab;
      },
      setDate(date){
        let [start="", end=""] = date.split(" - ");
        this[this.activedTab].parma.dateStart = start;
        this[this.activedTab].parma.dateEnd = end;
      },
      queryData(){
        this.render();
      },
      exportData(){
        
      }
    },
    created(){
      this.Query = this.$route.query;
      this.$store.commit('activMenu', 'sales');
      this.render();
    }
  }
</script>

<style lang="less">
</style>
