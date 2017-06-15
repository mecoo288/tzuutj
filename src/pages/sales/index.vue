<template>
  <div>
    <el-tabs v-model="activedTab" type="border-card" @tab-click="Do_activeTab">
      <el-tab-pane label="服务者管理统计表" name="report">
        <el-table :data="report" style="width: 100%">
          <el-table-column prop="fwz_name" label="姓名">{{}}</el-table-column>
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
      <el-tab-pane label="每日排名" name="rank">每日排名</el-tab-pane>
      <el-tab-pane label="业绩查询" name="query">业绩查询</el-tab-pane>
      <el-tab-pane label="周报明细" name="weekly">周报明细</el-tab-pane>
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
        parma:{}, /*query parma*/
        report:[],
        rank:[],
        query:[],
        weekly:[]
      }
    },
    computed:{
      activedTab(){
        return this.Query.to || "report";
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
        this.render();
        this.$router.push({path:'/sales', query:query})
      },
      goPage(query){
        this.$router.push({path:'/sales', query:query})
      },
      render(){
        let _this = this;
        this.fixParma();
        this.$store.dispatch('sales/GET_'+this.Query.to, {
          data: _this.parma,
          callback({status, errmsg, data}){
            if(status != "1"){
              _this.$message.error(errmsg);
              return
            }
            _this[_this.Query.to] = data.list;
          }
        })
      },
      fixParma(){
        if(this.Query.to == "report"){
          this.parma.type = this.Query.type || 1; 
        }else{
          delete this.parma.type;
        }
      }
    },
    created(){
      console.log(this);
      this.Query = this.$route.query;
      this.$store.commit('activMenu', 'sales');
      this.render();
    }
  }
</script>

<style lang="less">
</style>
