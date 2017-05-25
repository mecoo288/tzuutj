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
    console.log(this.$store.state.module_dd.default.chartList.zdd);
   },
   created(){
      this.$emit('say', 'zdd');
   }
 }

</script>