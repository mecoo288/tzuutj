<template>
  <div>
  2222
  </div>
</template>

<script>
  import myselect from './select'
  export default {
    props:['tag'],
    components: {
    },
    data(){
      return {
       menus: {}   
     }
   },
   created(){

   },
   methods: {

   },
   mounted(){

        //登录校验 最终在server端做
        if(this.$cookie.get('txy_name')==null||this.$cookie.get('txy_token')==null){

          this.$router.push('/login')
        }
      }

    }
  </script>

  <style rel="stylesheet/less" lang="less">


  </style>
