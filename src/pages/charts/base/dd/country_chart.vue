<template>
	<div>

		<div class="ui  seven item menu">
			<a class="item" :class="{active: activeTag == tab.alias}"  v-for="tab in chartTab" :href="'#/charts/dd/country/'+tab.alias"  @click='updateByType(tab.alias)'>
				{{tab.name}}
			</a>
		</div>

		<router-view></router-view>

	</div>
</template>
<script>
	import chartTab from '../../../../data/dd_country_chart_tab.json';
	import {mapActions} from 'vuex';
	export default {
		data(){
			return{
				chartTab: chartTab,
				activeTag: '',
				options:{}
			}
		},
		methods:{
			...mapActions([
				'updateByTypeOfDd',
				'initFirstAll',
			]),
			updateByType(type){
				this.activeTag = type;
				this.updateByTypeOfDd({ chartType:type });
			},
		},
		mounted(){
			let that = this;
			let first = this.initFirstAll({region:true,type:'module_dd'});
			let _path = this.$route.path.split("/");
			let tag = _path[_path.length - 1];
			first.then((m)=>{
				that.updateByTypeOfDd({ chartType: tag })
			});
			this.activeTag = tag;
		}
	}
</script>
<style rel="stylesheet/less" lang="less">
	.ui.seven.item.menu{
		line-height:25px;
		display: flex;
		a.item.active{
			font-size:17px;
			color:#34495e;
			border-top-width: 4px;
			border-top-color: #527492;
			border-top-style: inherit;
		}
		a.item{
			font-size:16px;
			color:#5c5f66;
			flex: 1;
		}	
		a{
			height:50px;
			width:188px;
		}

	}
</style>