<template>
	<div>
    <mySelect></mySelect>
    <table class="ui large table" id="tabledata">
     <caption id="tablecaption"></caption>
     <thead>
      <tr>

       <th v-for="tab in $store.state.module_sp.default.tabList">{{tab.name}}</th>

     </tr>
   </thead>
   <tbody>


    <tr v-for="item in $store.state.module_sp.default.tableList.trtotal">
      <td >{{$store.state.module_sp.default.tableList.rqList[item-1].count}}</td>
      <td >{{$store.state.module_sp.default.tableList.trspList[item-1].count}}</td>
      <td >{{$store.state.module_sp.default.tableList.gysmcList[item-1].count}} </td>
      <td >{{$store.state.module_sp.default.tableList.slList[item-1].count}} </td>
      <td >{{$store.state.module_sp.default.tableList.ssjeList[item-1].count}} </td>

    </tr>


  </tbody>
  <tfoot>
    <tr><th colspan="10">
      <mypage firstType="Sp"></mypage>
    </th>
  </tr></tfoot>
</table>
</div>
</template>
<script>
	import mySelect from './componets/select.vue'
  import mypage from "../components/page.vue"
  export default{
    data () {
      return {
        firstThName:'日期',
        currentPage:1
      }
    },
    components:{
      mySelect,
      mypage
    },
    mounted(){
      var that=this

      var first=this.$store.dispatch('initFirstAll',{region:true,type:'module_sp'})

      first.then((m)=>{

        var init=that.$store.dispatch('initTableOfSp')

        

        init.then(res=>{

          that.$store.dispatch('updateTableOfSp')

        },error=>{

        });

      })
    }
  }
</script>
<style lang="less">
	
</style>