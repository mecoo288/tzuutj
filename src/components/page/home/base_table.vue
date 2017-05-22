<template>
  <div>

    <!-- <button  @click="returnme"  v-if="threeType!='country'" class="ui primary basic button">返回</button> -->




    <table class="ui large table" id="tabledata">
     <caption id="tablecaption"></caption>
     <thead>
      <tr>
       <th v-for="tab in tabs">{{tab.name}} <span v-if="legend">({{tab.legend}})</span></th>
     </tr>
   </thead>
   <tbody>
    <tr v-for="item in tableList">
      <template v-if="threeType === 'total'">
        <td >{{item.date}}</td>
        <td >{{item.date}}</td>
        <td >{{item.newbie}}</td>
        <td >{{item.total}}</td>
        <td >{{item.hasorder}}</td>
        <td >{{item.orders_num}}</td>
        <td >{{item.orders_num}}</td>
        <td >{{item.guests_num}}</td>
        <td >{{item.pay_money}}</td>
      </template>
      <template v-if="threeType === 'order'">
        <td >{{item.date}}</td>
        <td >{{item.date}}</td>
        <td >{{item.newbie}}</td>
        <td >{{item.total}}</td>
        <td >{{item.orders_num}}</td>
        <td >{{item.guests_num}}</td>
        <td >{{item.pay_money}}</td>
      </template>
      <template v-if="threeType === 'provider'">
        <td >{{item.date}}</td>
        <td >{{item.hasorderPercent}}%</td>
        <td >{{item.orderPercent}}%</td>
        <td >{{item.orderaddPercent}}%</td>
        <td >{{item.fwzaddPercent}}%</td>
        <td >{{item.newbie}}</td>
        <td >{{item.hasorder}}</td>
        <td >{{item.orders_num}}</td>
      </template>
    </tr>
  </tbody>
  <tfoot>
    <tr><th colspan="10">
      <mypage v-if="threeType=='country'" firstType="Dd"></mypage>
    </th>
  </tr>
</tfoot>
</table>
</div>
</template>


<script>

  import mypage from "./common/page"
  import {mapActions} from 'vuex'

  import tabTag from "./data/tabTag.js";

  export default{
    props:['threeType'],
    data(){
      return{
        tabs: '',
        pages:[1,2,3,4,5],
        currentPage:1,
        tableList: []
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
      // this.update(this.threeType);
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
        'initFirstAll',
        'initTableOfDd',
        'updateTableOfDd',
        'updateXq',
        'getDate'
      ]),
      update(type){
        let _this= this;
        this.tabs = tabTag[type];
        this.getDate({
          type: type,
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
          console.log(body.data);
        })
      },
      xq(event){
        var val = event.target.getAttribute('data-val')
        var val2 = event.target.getAttribute('data-val2')
        var cityCode = event.target.getAttribute('data-city')
        this.updateXq({val:val,val2:val2,cityCode:cityCode})
      },

      returnme(){

        if(this.threeType=='city'){
          this.$router.push('/charts/dd/country/zdd')					
          this.$store.dispatch('returnme')
        }else if(this.threeType=='detail'){
          this.$router.push('/charts/dd/city')
          this.$store.dispatch('returnmedetail')
        }


      }	
    },
    components:{
      mypage
    },
    props: ['threeType']

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
