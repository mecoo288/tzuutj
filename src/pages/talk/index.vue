<template>
	<div v-loading.lock="isLoading">
		<el-form :inline="true" :model="parma">
			<el-form-item>
				<sel-city @change="cityChange"></sel-city>
			</el-form-item>
			<el-form-item>
			<el-input v-model="parma.fwzName" placeholder="请输入查询的姓名"></el-input>
			</el-form-item>
			<el-form-item label="日期">
				<el-date-picker :editable="false" v-model="parma.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
				<el-button type="primary" @click="dataExport" :disabled="true">导出</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="data" stripe style="width: 100%">
			<el-table-column prop="date" sortable label="日期"></el-table-column>
			<el-table-column prop="pid" label="会话商品ID"></el-table-column>
			<el-table-column prop="pname" label="会话商品名称"></el-table-column>
			<el-table-column prop="fwz_name" label="土著人姓名"></el-table-column>
			<el-table-column prop="order_num" sortable label="服务人数"></el-table-column>
			<el-table-column prop="chat_total_num" sortable label="会话总数"></el-table-column>
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
				isLoading: true,
				calConfig: calConfig,
				select:[
				{
					name:"TR商品",
					val:'trsp'
				},{
					name:"供应商",
					val:'gys'
				},
				],
				parma:{
					__dateRange: [],
					typeAlias:"gys",
					fwzName: "",
					dateStart:"",
					dateEnd:"",
					page: 1,
					cityCode:0
				},
				data:[],
				total:0,
				pageSize: 20,
				hasMore: false,
			}
		},
		components:{
			selCity
		},
		computed:{
			svalHolder(){
				return this.parma.typeAlias == "gys" ? "请输入供应商名" : "请输入TR商品名"
			}
		},
		methods:{
			render(){
				let _this = this;
				this.isLoading = true;
				this.$store.dispatch('talk/GET_talk', {
					data: _this.parma,
					callback({status, errmsg, data}){
						_this.isLoading = false;
						if(status != "1"){
							_this.$message.error(errmsg);
							return
						}
						_this.data = data.list;
						_this.total = data.total;
						_this.pageSize = data.length;
						_this.hasMore = data.hasMore;
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
			},
			dataExport(){
				this.$message({
					type:"warning",
					message:"功能开发中..."
				})
			}
		},
		created(){
			this.$store.commit('activMenu', 'talk');
			this.render();
		}
	}
</script>

<style rel="stylesheet/less" lang="less">

</style>