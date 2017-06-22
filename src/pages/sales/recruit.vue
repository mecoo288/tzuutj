<template>
  <div v-loading.lock="isLoading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/sales' }">BD销售统计</el-breadcrumb-item>
      <el-breadcrumb-item><b>{{params.recruitName}}</b> 服务者管理明细(近30天)</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="data" style="width: 100%; margin-top: 10px" stripe>
      <el-table-column prop="date" label="日期">
        <template scope="scope">
          <el-button @click="viewItem(scope.row)" type="text">{{scope.row.date}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="成单金额(元)">
        <template scope="scope">
          {{scope.row.money_sum | coin2yuan('')}}
        </template>
      </el-table-column>
      <el-table-column prop="order_num" label="成单数量"></el-table-column>
      <el-table-column prop="fwz_hasorder_num" label="成单服务者数量"></el-table-column>
      <el-table-column prop="fwz_online_num" label="上线服务者数量"></el-table-column>
      <el-table-column prop="fwz_focus_num" label="关注服务者数量"></el-table-column>
      <el-table-column prop="fwz_recruit_num" label="开拓服务者数量"></el-table-column>
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
          recruitName: "",
          date: "2017-06-21",
          type: 2,
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
      Object.assign(this.params,{
        recruitName: recruitName,
        recruitId: recruitId
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
