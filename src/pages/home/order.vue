<template>
  <div v-loading.lock="isLoading">
    <el-table :data="tableList" border stripe style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column prop="date" label="日期" sortable>
      </el-table-column>
      <el-table-column prop="guests_order" label="客单人数" sortable>
      </el-table-column>
      <el-table-column prop="guests_price" label="客单价" sortable>
      </el-table-column>
      <el-table-column prop="order_average" label="订单均价(元)" sortable>
      </el-table-column>
      <el-table-column prop="orders_num" label="订单数" sortable>
      </el-table-column>
      <el-table-column prop="guests_num" label="客人数" sortable>
      </el-table-column>
      <el-table-column prop="pay_money" label="销售额" sortable>
      </el-table-column>
    </el-table>
</div>
</template>


<script>
  export default{
    props:['threeType', 'baseParma'],
    data(){
      return{
        isLoading: false,
        pages:[1,2,3,4,5],
        currentPage:1,
        tableList: [],
        treeType: "order",
        parma: {
          cityCode:0,
          type: 1
        },
        chartConf: {
          title: {
            text: '客单价和订单均价比较'
          },
          tooltip: {
            shared: true
          },
          legend: {
            layout: 'horizontal',
          },
          yAxis:[{
            title:{
              text:""
            },
            labels: {
              format: '{value}'
            }
          }],
          series:[{
            data:[],
            name: "客单价",
            tooltip: {
              valueSuffix: '元'
            }
          },
          {
            color:'rgb(230,165,25)',
            data:[],
            name: "订单均价",
            tooltip: {
              valueSuffix: '元'
            }
          }]
        }
      }
    },
    mounted(){
      Object.assign(this.parma, this.baseParma.data);
      this.$emit('updateChart', {options: this.chartConf, tab:"order"}); // 更新图标
      this.$store.commit('home/Do_activeTag', 'order');
      this.update();
    },
    methods:{
      cityChange(parma){
        Object.assign(this.parma, parma);
        this.update();
      },
      update(){
        let _this= this;
        _this.isLoading = true;
        this.$store.dispatch('home/GET_order', {
          data: this.parma,
          callback({status, errmsg, data, code}){
            _this.isLoading = false;
            if(status == "0"){
              _this.$message.error(errmsg);
              return;
            }
            _this.tableList = data;
            let guestsPrice=[], orderAverage=[];
            data.forEach(function({date, guests_price, order_average}){
              date = Date.parse(date);
              guestsPrice.unshift([date, guests_price||0]);
              orderAverage.unshift([date, order_average||0]);
            });
            _this.chartConf.series[0].data = guestsPrice;
            _this.chartConf.series[1].data = orderAverage;
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