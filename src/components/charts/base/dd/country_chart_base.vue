<template>
<div>
     <highcharts  :options="options" ref="highcharts">
     </highcharts>
</div>
</template>
<script  type="text/ecmascript-6">
let opt={};
export default {
     
       data(){
         return{
                 options:opt
         }
       }
}

</script>