<template>
  <div class="myselect">
    <div class ="mysecond ui  column grid">
      <div class="xzcstext">    
        选择城市:
      </div>
      <div class="myregion">
        <div class="ui dropdown item">
          {{city_name}} 
          <i class="dropdown icon"></i>
          <div class="ui menu" id="myregionone">
            <a  v-for="city in citys" class="item" @click="selectme(city)" :data-city-name="city">{{city.name}}</a>
          </div>
        </div>
      </div>
      <!-- <div class="myexport" >
        <div class="myexbutton" @click="exportdata">导出</div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import mydate from "./common/date";

  export default{
    data(){
      return {
        city_name:"请选择",
        region_name:"全国",
        citys:[],
        selCity:{
          type: 1
        }
      }
    },
    mounted(){
      let _this = this;
      $('.ui.dropdown').dropdown({
          on: 'hover'
      });
      this.GET_city().then(function({status, errmsg, data, code}){
        if(status != 1){
          alert(errmsg);
          return;
        }
        _this.citys = data;
      })
    },
    methods:{
      ...mapActions([
        'GET_city'
      ]),
      exportdata(){
        this.$store.dispatch('download',{type:'dd',name:'订单'})
      },
      selectme(city){
        if(this.selCity.code === city.code ){
          return;
        }
        this.city_name = city.name;
        Object.assign(this.selCity, city, {type: city.code === 0 ? 1 : 2});
        this.$emit('cityUpdate', this.selCity)
      }
    },
    components:{
      mydate,
    }
  }
</script>
<style rel="stylesheet/less" lang="less">
  .xzcstext{
    min-width: 100px;
  }
  .myregion{
    min-width: 120px;
    margin-right: 20px;
  }
  .myselect{
    min-height: 60px;
    height: auto;
  }
</style>