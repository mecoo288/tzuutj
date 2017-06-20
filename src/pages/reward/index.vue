<template>
	<div v-loading.lock="isLoading">
		<el-form :inline="true" :model="parma">
			<el-form-item>
				<sel-city @change="cityChange"></sel-city>
			</el-form-item>
			<el-form-item>
				<el-input v-model="parma.fwzName" placeholder="请输入需要查询的姓名"></el-input>
			</el-form-item>
			<el-form-item label="筛选日期">
				<el-date-picker :editable="false" v-model="parma.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
				<el-button type="primary" @click="dataExport" :disabled="true">导出</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="data" stripe style="width: 100%">
			<el-table-column prop="date" label="日期"></el-table-column>
			<el-table-column prop="fwz_name" label="服务者姓名"></el-table-column>
			<el-table-column prop="tr_name" label="TR名称"></el-table-column>
			<el-table-column prop="pay_money" label="打赏金额"></el-table-column>
			<el-table-column prop="status_name" label="打赏状态"></el-table-column>
		</el-table>
		<el-pagination v-if="hasMore" :current-page.sync="parma.page" :page-size="pageSize" @current-change="render" layout="total, prev, pager, next" :total="total" class="pagination">
		</el-pagination>
	</div>
</template>

<script>
	import selCity from "../components/citys/";
	import {calConfig} from "../data/config.js";
	export default {
		data(){
			return {
				isLoading: false,
				calConfig: calConfig,
				parma:{
					__dateRange: [],
					fwzName: "",
					dateStart:"",
					dateEnd:"",
					page: 1,
					cityCode:0,
					cityName:"全部"
				},
				data:[],
				total:0,
				hasMore: false,
				pageSize: 20,
				data:[],
			}
		},
		components:{
			selCity
		},
		methods:{
			render(){
				let _this = this;
				// this.isLoading = true;
				this.$store.dispatch('reward/GET_reward', {
					data: _this.parma,
					callback({status, errmsg, data}){
						_this.isLoading = false;
						if(status != "1"){
							_this.$message.error(errmsg);
							return
						}
						_this.data = data.list;
						_this.total = data.total;
						_this.hasMore = data.hasMore;
						_this.pageSize = data.length;
					}
				})
			},
			search(){
				this.parma.page =1;
				this.render();
			},
			setDate(date){
				let [start="", end=""] = date.split(" - ");
				this.parma.dateStart = start;
				this.parma.dateEnd = end;
			},
			cityChange(city){
				this.parma.cityCode = city.code;
				this.parma.cityName = city.name;
			},
			dataExport(){
				this.$message({
					type:"warning",
					message:"功能开发中..."
				})
			}
		},
		created(){
			this.$store.commit('activMenu', 'reward');
			this.render();
		}
	}
</script>

<style rel="stylesheet/less" lang="less">

</style>