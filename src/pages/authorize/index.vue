<template>
  <div style="height:100%">
    <myheader></myheader>
  </div>
</template>

<script>
  import myheader from '../components/header/'
  export default {
    components: {
      myheader
    },
    data(){
      return {
        nowUser:'',
        nowUserId:0,
        selectAll:false,
        menus:{},
      }
    },
    computed(){

    },
    methods: {
      removeCity(env){

        var id=env.target.getAttribute('data-arrid')
        var userId=env.target.getAttribute('data-userid')
        this.$store.dispatch('removeUserCity',{id:id,userId:userId})
      },
      guanli(env){
        var user=env.target.getAttribute('data-val')
        var userId=env.target.getAttribute('data-useridval')
        this.nowUser=user
        this.nowUserId=userId
        $('.ui.modal').modal('show')

        if(this.$store.state.limits.default.qxListObj[this.nowUserId]){
          if(Object.keys(this.$store.state.limits.default.qxListObj[this.nowUserId]).length==this.$store.state.limits.default.citys_merge.length){
            this.selectAll=true
          }else{
            this.selectAll=false
          }
        }


        this.$store.dispatch('updateUserCitysListDataByUserId',{userId:this.nowUserId})

      },
      closeme(){

        $('.ui.modal').modal('hide')
      },
      checkme(env){
        var cityCode=env.target.getAttribute('data-citycode')
        var cityName=env.target.getAttribute('data-cityname')
        var that=this

        this.$store.dispatch('updateUserCity',{userId:this.nowUserId,cityCode:cityCode,cityName:cityName}).then(()=>{


          if(that.$store.state.limits.default.qxListObj[this.nowUserId]){
            if(Object.keys(that.$store.state.limits.default.qxListObj[this.nowUserId]).length==that.$store.state.limits.default.citys_merge.length){
              that.selectAll=true
            }else{
              that.selectAll=false
            }

          }
          this.$store.dispatch('updateUserCityAllOne',{userId:this.nowUserId,status:that.selectAll});


        });
      },
      checkall(env){
        var checked=env.target.checked;
        this.selectAll=checked

        this.$store.dispatch('updateUserCityAll',{userId:this.nowUserId,checked:checked})	


      }


    },
    mounted(){



      var that = this
      this.$store.dispatch('initUserList').then((dataList)=>{
        that.$store.dispatch('initUserCitysList',{userLists:dataList})

      });

      $('.ui.dropdown').dropdown({
        on: 'hover'
      });



    }

  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "../../static/style/index";
  
  #limit {
    margin:10px;
    padding-top: 10px;
  }
  input[type="checkbox"]
  {
    margin-left:0px !important 
  }
  .rightme{
   float:right 
 }
 .rightmex{
   margin-right:10px
 }
 .xyz{

   margin-right:8px !important
 }
 .ui.modal{
   overflow:auto !important


 }
</style>
