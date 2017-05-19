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
				options:this.$store.state.module_dd.default.chartList.bzje
			}
		},
		computed:{
			
		}
	}


</script>