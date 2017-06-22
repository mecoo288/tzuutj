<template>
  <div v-loading.lock="isLoading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/sales' }">BD销售统计</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/sales/'+ Query.recruit}">{{Query.recruitName}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{Query.recruitName}} {{Query.date}} 业绩报表明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="data" style="width: 100%; margin-top: 10px" stripe>
      <el-table-column prop="fwz_name" label="服务者"></el-table-column>
      <el-table-column prop="fwz_source" label="服务者来源"></el-table-column>
      <el-table-column prop="order_num" label="订单数"></el-table-column>
      <el-table-column label="成单金额(元)">
        <template scope="scope">
          {{scope.row.money_sum | coin2yuan('')}}
        </template>
      </el-table-column>
      <el-table-column prop="guest_num" label="客人数量"></el-table-column>
      <el-table-column prop="taday_fwz_num" label="有效新增服务者数量"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {coin2yuan} from "../../filters/";
  export default {
    data(){
      return {
        isLoading: false,
        Query:{}, /*url query*/
        params:{
          date: "",
          type: 3,
          recruitId: "",  
        },
        data:[],
        total:0,
        pageSize: 20,
        hasMore: false
      }
    },
    filters:{
      coin2yuan
    },
    methods:{
      viewItem({date}){
        this.$router.push({path:'/sales/'+ this.$route.params.recruit + "/" + date})
      },
      render(){
        let _this = this;
        this.isLoading = true;
        this.$store.dispatch('sales/GET_report', {
          data: this.params,
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
          }
        })
      },
    },
    created(){
      let [recruitName, recruitId] = this.$route.params.recruit.split("__");
      this.Query = this.$route.params;
      Object.assign(this.Query,{
        recruitName: recruitName,
        recruitId: recruitId
      });
      Object.assign(this.params, {
        date: this.Query.date,
        recruitId: recruitId,
      })
      this.$store.commit('activMenu', 'sales');
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
