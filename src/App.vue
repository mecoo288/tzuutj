<template>
	<router-view style="height:100%"></router-view>
</template>
<script>
	import Vue from 'vue';
	import {locals} from './plugin/locals.js';
	Vue.use(locals);
	export default{
		data(){
			return {
			}
		},
		created(){
		}
	}  
</script>

<style lang="less">
	@import "./static/style/base";
</style>
