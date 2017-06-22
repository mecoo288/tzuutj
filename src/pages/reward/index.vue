<template>
	<div v-loading.lock="isLoading">
		<el-form :inline="true" :model="params">
			<el-form-item>
				<sel-city @change="cityChange"></sel-city>
			</el-form-item>
			<el-form-item>
				<el-input v-model="params.fwzName" @change="searched = false" placeholder="请输入需要查询的姓名"></el-input>
			</el-form-item>
			<el-form-item label="筛选日期">
				<el-date-picker :editable="false" v-model="params.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
				<el-button type="primary" @click="dataExport" :disabled="canExport">导出</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="data" stripe style="width: 100%">
			<el-table-column prop="date" label="日期"></el-table-column>
			<el-table-column prop="fwz_name" label="服务者姓名"></el-table-column>
			<el-table-column prop="tr_name" label="TR名称"></el-table-column>
			<el-table-column prop="pay_money" label="打赏金额"></el-table-column>
			<el-table-column prop="status_name" label="打赏状态"></el-table-column>
		</el-table>
		<el-pagination v-if="hasMore" :current-page.sync="params.page" :page-size="pageSize" @current-change="render" layout="total, prev, pager, next" :total="total" class="pagination">
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
				searched: false,
				params:{
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
		computed:{
			canExport(){
				return !(this.params.dateStart && this.searched && this.total>0)
			}
		},
		methods:{
			render(){
				let _this = this;
				this.isLoading = true;
				this.searched = false;
				this.$store.dispatch('reward/GET_reward', {
					data: _this.params,
					callback({status, errmsg, data}){
						_this.isLoading = false;
						_this.searched = true;
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
				this.params.page =1;
				this.render();
			},
			setDate(date){
				this.searched = false;
				let [start="", end=""] = date.split(" - ");
				this.params.dateStart = start;
				this.params.dateEnd = end;
			},
			cityChange(city){
				this.searched = false;
				this.params.cityCode = city.code;
				this.params.cityName = city.name;
			},
			dataExport(){
				let _this = this;
				this.$store.dispatch('download/Do_download_reward',{
					data: this.params,
					callback({status, errmsg, data}){
						if(status != "1"){
							_this.$message.error(errmsg);
							return
						}
						_this.$store.commit('download/DONE_downLoad', {
							that: _this,
							type: 55000,
							title: "打赏统计导出提示",
							message: _this.params.dateStart + " 至 " + _this.params.dateEnd + '的报表文件正在生成请至下载中心下载'
						})
					}
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