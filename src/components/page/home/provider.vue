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
      <td >{{item.hasorderPercent}}%</td>
      <td >{{item.orderPercent}}%</td>
      <td >{{item.orderaddPercent}}%</td>
      <td >{{item.fwzaddPercent}}%</td>
      <td >{{item.newbie}}</td>
      <td >{{item.hasorder}}</td>
      <td >{{item.orders_num}}</td>
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

  import {provider} from "./data/tabTag.js";

  export default{
    props:['threeType'],
    data(){
      return{
        tabs: provider,
        pages:[1,2,3,4,5],
        currentPage:1,
        tableList: [],
        treeType: "provider",
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
    computed:{
      hrefVal:function(){
        var type='city'
        if(this.threeType=='city'){
          type='detail'
        }
        return '#/charts/dd/'+type
      }
    },
    mounted(){
      this.$emit('updateType', this.treeType);
      this.update();
      this.$emit('updateChart', this.chartConf);
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
      update(){
        let _this= this;
        this.getDate({
          type: this.treeType,
          data: {
            dateStart:"",
            dateEnd:"",
            type:"fwzsl",
            threeType:"country",
            page:1,
            provinceCode:0,
            cityCode:0,
            pageNum:20,
            no_page:1
          }
        }).then(function({status, body}){
          if(status !== 200){
            return;
          }
          _this.tableList = body.data;

          let hasorder_percent=[];
          body.data.forEach(function({date, hasorderPercent}){
            date = Date.parse(date);
            hasorder_percent.unshift([date, hasorderPercent]);
          });
          _this.chartConf.series[0].data = hasorder_percent;
        })
      },
    },
    components:{
      mypage
    },
    props: ['threeType', 'baseData']

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