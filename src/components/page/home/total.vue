<template>
  <div>
    <table class="ui large table" id="tabledata">
     <caption id="tablecaption"></caption>
     <thead>
      <tr>
       <th v-for="tab in tabs">{{tab.name}} <span v-if="tab.legend">({{tab.legend}})</span></th>
     </tr>
   </thead>
   <tbody>
    <tr v-for="item in tableList">
        <td >{{item.date}}</td>
        <td >{{item.week_day}}</td>
        <td >{{item.newbie}}</td>
        <td >{{item.total}}</td>
        <td >{{item.hasorder}}</td>
        <td >{{item.orders_num}}</td>
        <td >{{item.orders_detail_num}}</td>
        <td >{{item.guests_num}}</td>
        <td >{{item.pay_money}}</td>
    </tr>
  </tbody>
<!--   <tfoot>
    <tr><th colspan="10">
      <mypage v-if="threeType=='country'" firstType="Dd"></mypage>
    </th>
  </tr>
</tfoot> -->
</table>
</div>
</template>


<script>

  import mypage from "./common/page"
  import {mapActions} from 'vuex'

  import {total} from "./data/tabTag.js";

  export default{
    props:['baseParma'],
    data(){
      return{
        tabs: total,
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
      this.$emit('updateType', this.treeType);
      this.$emit('updateChart', this.chartConf);
      this.update();
    },
    methods:{
      ...mapActions([
        'updateXq',
        'getDate'
      ]),
      cityChange(parma){
        Object.assign(this.parma, parma);
        this.update();
      },
      update(){
        let _this= this;
        this.getDate({
          type: this.treeType,
          data: this.parma
        }).then(function({status, body}){
          if(status !== 200){
            return;
          }
          _this.tableList = body.data;
          let payMoney=[], totalProvider=[];
          body.data.forEach(function({date, pay_money, total}){
            date = Date.parse(date);
            payMoney.unshift([date, pay_money]);
            totalProvider.unshift([date, total]);
          });
          _this.chartConf.series[0].data = payMoney;
          _this.chartConf.series[1].data = totalProvider;
        })
      },
    },
    components:{
      mypage
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
