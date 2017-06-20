<template>
	<div>
		<el-form :inline="true"  class="demo-form-inline">
			<el-form-item>
				<sel-city @change="cityChange"></sel-city>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="服务商姓名"></el-input>
			</el-form-item>
			<el-form-item label="筛选日期">
				<el-date-picker :editable="false" v-model="parma.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="exportData">导出</el-button>
			</el-form-item>
		</el-form>
		<el-tabs type="border-card">
			<el-tab-pane label="主订单数量"></el-tab-pane>
			<el-tab-pane label="商品订单数量"></el-tab-pane>
			<el-tab-pane label="当日支付金额"></el-tab-pane>
			<el-tab-pane label="退单金额"></el-tab-pane>
			<el-tab-pane label="退单数量"></el-tab-pane>
			<el-tab-pane label="报账金额"></el-tab-pane>
			<el-tab-pane label="报账数量"></el-tab-pane>
			<el-tab-pane label="订单均价"></el-tab-pane>
		</el-tabs>
	</div>

</template>

<script>
	import selCity from "../components/citys/";
	import {calConfig} from "../data/config.js";
	export default {
		data(){
			return {
				calConfig:calConfig,
				parma:{
					__dateRange:[],
				},
			}
		},
		components:{
			selCity
		},
		methods:{
			search(){

			},
			cityChange(){

			},
			setDate(){

			},
			exportData(){

			}
		},
		created(){
			this.$store.commit('activMenu', 'order');
		}
	}
</script>

<style lang="less">

</style>
