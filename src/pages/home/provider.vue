<template>
  <div>
    <el-table :data="tableList" border stripe style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column prop="date" label="日期" sortable>
      </el-table-column>
      <el-table-column prop="hasorderPercent" label="成单服务者占比率" sortable>
        <template scope="scope" sortable>
          {{ scope.row.hasorderPercent }}%
        </template>
      </el-table-column>
      <el-table-column prop="orderPercent" label="成单服务者平均成单数" sortable>
      </el-table-column>
      <el-table-column prop="orderaddPercent" label="订单增长率" sortable>
        <template scope="scope">
          {{ scope.row.orderaddPercent }}%
        </template>
      </el-table-column>
      <el-table-column prop="newbie" label="新增后服务者数" sortable>
      </el-table-column>
      <el-table-column prop="hasorder" label="成单服务者数" sortable>
      </el-table-column>
      <el-table-column prop="orders_num" label="订单数" sortable>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import {Percentage} from '../../filters/'
  export default{
    props:['threeType', 'baseParma'],
    data(){
      return{
        pages:[1,2,3,4,5],
        currentPage:1,
        tableList: [],
        treeType: "provider",
        parma: {
          cityCode:0,
          type: 1
        },
        filters:{
          Percentage
        },
        chartConf: {
          title: {
            text: '成单服务者占比率'
          },
          yAxis:[{
            title:{
              text:""
            },
            labels: {
              format: '{value}%'
            }
          }],
          series:[{
            name:" ",
            data:[],
            tooltip: {
              valueSuffix: '%'
            }
          }]
        }
      }
    },
    mounted(){
      Object.assign(this.parma, this.baseParma.data);
      this.$emit('updateChart', {options: this.chartConf, tab:"provider"});
      this.$store.commit('home/Do_activeTag', 'provider');
      this.update();
    },
    methods:{
      cityChange(parma){
        Object.assign(this.parma, parma);
        this.update();
      },
      update(){
        let _this= this;
        this.$store.dispatch('home/GET_provider', {
          data: this.parma,
          callback({status, errmsg, data, code}){
            if(status == "0"){
              _this.$message.error(errmsg);
              return;
            }
            _this.tableList = data;

            let hasorder_percent=[];
            data.forEach(function({date, hasorderPercent}){
              date = Date.parse(date);
              hasorder_percent.unshift([date, hasorderPercent]);
            });
            _this.chartConf.series[0].data = hasorder_percent;
          }
        })
      },
    },
  }
</script>
<style rel="stylesheet/less" lang="less">

  #dd_city_table{
    button.ui.primary.basic.button{
      width: 15%;
      background-color: #527493 !important;
      margin-bottom: 10px;
      color: white !important;
      height: 34px;
      font-size:14px; 
    }

  }

  #dd_detail_table {
    button.ui.primary.basic.button{
      width: 15%;
      background-color: #527493 !important;
      margin-bottom: 10px;
      color: white !important;
      height: 34px;
      font-size:14px;
    }

  }


  #uptable{

    border-style: outset;
    border-color:#c9caca;
    border-width:1px;

    
    width: 15%;
    border-bottom: snow;
    height: 50px;
    border-top-style: inset;
    border-top-color: #517599;
    border-top-width: 5px;
    text-align:center;
    font-size:18px;
    border-right-color: #c9caca;
    border-right-style: double;

  }


  #uptable p {
    line-height: 40px;
  }

</style>