<template>
  <div>
    <el-table :data="tableList" border stripe style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column prop="date" label="日期" sortable>
      </el-table-column>
      <el-table-column prop="week_day" label="星期" sortable>
      </el-table-column>
      <el-table-column prop="newbie" label="服务者新增 (单位/人)" sortable>
      </el-table-column>
      <el-table-column prop="total" label="服务者总数 (单位/人)" sortable>
      </el-table-column>
      <el-table-column prop="hasorder" label="服务者成单数量 (单位/人)" sortable>
      </el-table-column>
      <el-table-column prop="orders_num" label="主订单数 (单位/单)" sortable>
      </el-table-column>
      <el-table-column prop="orders_detail_num" label="详单数量 (单位/单)" sortable>
      </el-table-column>
      <el-table-column prop="guests_num" label="客人数量 (单位/人)" sortable>
      </el-table-column>
      <el-table-column prop="pay_money" label="成单金额 (单位/元)" sortable>
      </el-table-column>
    </el-table>
</div>
</template>


<script>
  export default{
    props:['baseParma'],
    data(){
      return{
        pages:[1,2,3,4,5],
        currentPage:1,
        tableList: [],
        treeType: "total",
        parma: {
          cityCode:0,
          type: 1
        },
        chartConf: {
          title: {
            text: '成单金额与服务者数量趋势图'
          },
          tooltip: {
            shared: true
          },
          legend: {
              layout: 'horizontal',
          },
          chart: {
              borderColor: '#ccc',
              borderWidth: 1,
              type: 'line'
          },
          yAxis: [{ // Primary yAxis
              title: {
                  text: '当天成单金额',
                  style: {
                      color: "#333"
                  }
              },
              labels: {
                  format: '{value}',
                  style: {
                      color: "#333"
                  }
              }
          }, { // Secondary yAxis
              title: {
                  text: '至今服务者数量',
                  style: {
                      color: "#333"
                  }
              },
              labels: {
                  format: '{value}',
                  style: {
                      color: "#333"
                  }
              },
              opposite: true
          }],
          series:[{
            type:'column',
            color:'rgb(230,165,25)',
            data:[],
            name: "当天成单金额（单位：元）",
            tooltip: {
                valueSuffix: '元'
            }
          },
          {
            yAxis:1,
            type: 'spline',
            data:[],
            name: "至今服务者总数（单位：人）",
            tooltip: {
                valueSuffix: '人'
            }
          }]
        }
      }
    },
    mounted(){
      Object.assign(this.parma, this.baseParma.data);
      this.$emit('updateChart', {options: this.chartConf, tab:"total"});
      this.update();
    },
    methods:{
      cityChange(parma){
        Object.assign(this.parma, parma);
        this.update();
      },
      update(){
        let _this= this;
        this.$store.commit('home/Do_activeTag', 'total');
        this.$store.dispatch('home/GET_tjBoth', {
          data: this.parma,
          callback({status, errmsg, data, code}){
            if(status == "0"){
            _this.$message.error(errmsg);
            return;
          }
          _this.tableList = data;
          let payMoney=[], totalProvider=[];
          data.forEach(function({date, pay_money, total}){
            date = Date.parse(date);
            payMoney.unshift([date, pay_money]);
            totalProvider.unshift([date, total]);
          });
          _this.chartConf.series[0].data = payMoney;
          _this.chartConf.series[1].data = totalProvider;
          }
        })
      },
    }
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
