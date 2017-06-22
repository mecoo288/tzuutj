<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {locals} from './plugin/locals.js';
	Vue.use(locals);
	export default{
		data(){
			return {
				loadingShow: false
			}
		},
		created(){
		}
	}  
</script>

<style lang="less">
	@import "./static/style/index";
	#app{
	   //     margin-top:60px;
	   height: 100%;
	   overflow: hidden;
	}

</style>
