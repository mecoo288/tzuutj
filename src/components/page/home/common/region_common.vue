<template>
  <div>  
    <div class="ui dropdown item">
      {{city}} 
      <i class="dropdown icon"></i>
      
      <div class="ui menu" id="myregionone">
        <a  v-for="city in citys_limit" class="item" @click="selectme"  :data-code="city.code">{{city.name}}</a>
      </div>

    </div>
  </div>
</template>

<script>

  export default{


   data(){
    return {
      type:"module_"+(this.firstType.toLowerCase()),
      city: "",
      citys_limit: [
        {"code":0,"name":"全部"},{"code":110100,"name":"北京市"},{"code":120100,"name":"天津市"},{"code":140400,"name":"长治市"},{"code":150100,"name":"呼和浩特市"},{"code":150200,"name":"包头市"},{"code":150300,"name":"乌海市"},{"code":150700,"name":"呼伦贝尔市"},{"code":210200,"name":"大连市"},{"code":220100,"name":"长春市"},{"code":310100,"name":"上海市"},{"code":320400,"name":"常州市"},{"code":350400,"name":"三明市"},{"code":360400,"name":"九江市"},{"code":371600,"name":"滨州市"},{"code":430800,"name":"张家界市"},{"code":450300,"name":"桂林市"},{"code":530700,"name":"丽江市"}
      ]
    }
  },
  props: ['firstType'],
  mounted(){
    $('.ui.dropdown').dropdown({
          on: 'hover'
      });
  },
  methods:{
    selectme(event){
      var name=event.target.text;
      var code=event.target.getAttribute('data-code');
      this.city=name;
    }
  }

}
</script>
<style rel="stylesheet/less" lang="less">
  #myregionone{
    margin-left:-10px;
  }

</style>