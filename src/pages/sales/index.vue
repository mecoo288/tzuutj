<template>
  <div>
    <el-tabs v-model="activedTab" type="border-card" @tab-click="activeTab">
      <el-tab-pane label="业绩报表" name="report">
        <el-table :data="report" style="width: 100%">
          <el-table-column
            prop="repart.aa"
            label="日期"
            sortable
            width="180">
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
  export default {
    data(){
      return {
        activedTab: "report",
        report:[],
        rank:[],
        query:[],
        weekly:[]
      }
    },
    methods:{
      activeTab({name, ...ot}){
        console.log(ot)
      }
    },
    created(){
      this.$store.commit('activMenu', 'sales');
    }
  }
</script>

<style lang="less">
</style>
