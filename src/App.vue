<template>
	<div id="app">
		<loading :loadingShow="loadingShow"></loading>
		<router-view></router-view>
	</div>
</template>

<script>
	import loading from './components/loading.vue';
	export default{
		data(){
			return {
				loadingShow: false
			}
		},
		components:{
			loading,
		},
		created(){
			let _this = this;
		}
	}  
</script>

<style rel="stylesheet/less" lang="less">
	@import "./static/style/index";
	#app{
   //     margin-top:60px;
}

</style>
