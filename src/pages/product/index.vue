<template>
	<div v-loading.lock="isLoading">
		<el-form :inline="true" :model="parma">
			<el-form-item>
				<sel-city @change="cityChange"></sel-city>
			</el-form-item>
			<el-form-item>
				<el-select v-model="parma.typeAlias" placeholder="请选择">
					<el-option v-for="item in select" :key="item.val" :label="item.name" :value="item.val">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-input v-model="parma.searchVal" :placeholder="svalHolder"></el-input>
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
		<el-table-column prop="date" sortable label="日期"></el-table-column>
		<el-table-column prop="stock_name" label="TR商品"></el-table-column>
		<el-table-column prop="sp_name" label="供应商名称"></el-table-column>
		<el-table-column prop="total_num" sortable label="数量"></el-table-column>
		<el-table-column prop="total_money" sortable label="销售金额(单位: 元)"></el-table-column>
	</el-table>
	<el-pagination :current-page.sync="parma.page" :page-size="pageSize" @current-change="render" layout="total, prev, pager, next" :total="total" class="pagination">
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
					searchVal: "",
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
				this.$store.dispatch('product/GET_products', {
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
			this.$store.commit('activMenu', 'product');
			this.render();
		}
	}
</script>

<style rel="stylesheet/less" lang="less">

</style>