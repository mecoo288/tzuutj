<template>
	<div v-loading.lock="isLoading">
		<el-form :inline="true" :model="parma">
			<el-form-item>
				<el-select v-model="parma.typeAlias" placeholder="请选择">
					<el-option v-for="item in aliasType" :key="item.val" :label="item.name" :value="item.val">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-input v-model="parma.searchVal" :placeholder="svalHolder"></el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="parma.dateType" placeholder="请选择">
					<el-option v-for="item in dateType" :key="item.val" :label="item.name" :value="item.val">
					</el-option>
				</el-select>
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
			<el-table-column prop="pay_date" sortable label="日期"></el-table-column>
			<el-table-column prop="stock_name" label="TR商品"></el-table-column>
			<el-table-column prop="sp_user_name" label="服务商商名称"></el-table-column>
			<el-table-column prop="pnum" sortable label="购买数量"></el-table-column>
			<el-table-column prop="fc" sortable label="供应商分成金额"></el-table-column>
		</el-table>
		<el-pagination :current-page.sync="parma.page" :page-size="pageSize" @current-change="render" layout="total, prev, pager, next" :total="total" class="pagination">
		</el-pagination>
	</div>
</template>

<script>
	import {calConfig} from "../data/config.js";
	export default {
		data(){
			return {
				isLoading: true,
				calConfig: calConfig,
				aliasType:[
				{
					name:"服务商",
					val:'fws'
				},{
					name:"服务者",
					val:'fwz'
				},{
					name:"供应商",
					val:'gys'
				},
				],
				dateType:[
				{
					name: "支付时间",
					val: 1,
				},
				{
					name: "完成时间",
					val: 2,
				}],
				parma:{
					__dateRange: [],
					typeAlias:"fws",
					searchVal: "",
					dateType: 1,
					dateStart:"",
					dateEnd:"",
					page: 1,
					cityCode:0
				},
				data:[],
				total:0,
				pageSize: 20
			}
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
				this.$store.dispatch('divide/GET_divides', {
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
			dataExport(){
				this.$message({
					type:"warning",
					message:"功能开发中..."
				})
			}
		},
		created(){
			this.$store.commit('activMenu', 'divide');
			this.render();
		}
	}
</script>

<style rel="stylesheet/less" lang="less">

</style>