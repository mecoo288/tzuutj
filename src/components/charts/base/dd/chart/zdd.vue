<template>
  <div>
   <highcharts  :options="options" ref="highcharts">
   </highcharts>
 </div>
</template>
<script>
  export default {

   data(){
     return{
       options:this.$store.state.module_dd.default.chartList.zdd
     }
   },
   methods:{

   },
   mounted(){

   },
   created(){
      this.$emit('say', 'zdd');
   }
 }

</script>