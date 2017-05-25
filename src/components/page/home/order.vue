<template>
  <div>

    <!-- <button  @click="returnme"  v-if="threeType!='country'" class="ui primary basic button">返回</button> -->
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
      <td >{{item.guests_order}}</td>
      <td >{{item.guests_price}}</td>
      <td >{{item.order_average}}</td>
      <td >{{item.orders_num}}</td>
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

  import {order} from "./data/tabTag.js";

  export default{
    props:['threeType', 'baseParma'],
    data(){
      return{
        tabs: order,
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
      this.$emit('updateType', this.treeType);
      this.$emit('updateChart', this.chartConf); // 更新图标
      this.update();
      // var that=this;
      // var first=this.initFirstAll({region:true,type:'module_home'})

      // first.then((m)=>{

      //   this.initTableOfDd({threeType:this.threeType}).then((msg)=>{
      //     that.updateTableOfDd()
      //   })

      // })

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
          let guestsPrice=[], orderAverage=[];
          body.data.forEach(function({date, guests_price, order_average}){
            date = Date.parse(date);
            guestsPrice.unshift([date, guests_price||0]);
            orderAverage.unshift([date, order_average||0]);
          });
          _this.chartConf.series[0].data = guestsPrice;
          _this.chartConf.series[1].data = orderAverage;
        })
      },
    },
    components:{
      mypage
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