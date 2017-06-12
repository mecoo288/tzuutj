<template>
	<div id="app">
		<loading :loadingShow="loadingShow"></loading>
		<router-view></router-view>
	</div>
</template>

<script>
	import Vue from 'vue';
	import loading from './components/loading.vue';
	import {locals} from './plugin/locals.js';
	Vue.use(locals);
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
		}
	}  
</script>

<style rel="stylesheet/less" lang="less">
	@import "./static/style/index";
	#app{
	   //     margin-top:60px;
	   height: 100%;
	}

</style>
