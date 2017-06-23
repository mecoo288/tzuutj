<template>
	<div v-loading.lock="isLoading">
		<el-form :inline="true" :model="params">
			<el-form-item>
				<el-select v-model="params.typeAlias" @change="searched = false" placeholder="请选择">
					<el-option v-for="item in aliasType" :key="item.val" :label="item.name" :value="item.val">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-input v-model="params.searchVal" @change="searched = false" :placeholder="svalHolder"></el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="params.dateType" @change="searched = false" placeholder="请选择">
					<el-option v-for="item in dateType" :key="item.val" :label="item.name" :value="item.val">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="筛选日期">
				<el-date-picker :editable="false" v-model="params.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
			<!-- <el-form-item>
				<el-button type="primary" @click="dataExport" :disabled="canExport">导出</el-button>
			</el-form-item> -->
		</el-form>
		<el-table :data="data" stripe style="width: 100%">
			<el-table-column prop="pay_date" sortable label="日期">
				<template scope="scope">
					<span v-if="params.dateType == 1">{{scope.row.pay_date}}</span>
					<span v-if="params.dateType == 2">{{scope.row.finish_date}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="stock_name" label="TR商品"></el-table-column>
			<el-table-column label="服务商名称">
				<template scope="scope">
					<span v-if="params.typeAlias == 'gys'">{{scope.row.sp_user_name}}</span>
					<span v-if="params.typeAlias == 'fwz'">{{scope.row.server_user_name}}</span>
					<span v-if="params.typeAlias == 'fws'">{{scope.row.server_up_user_name}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="pnum" sortable label="购买数量"></el-table-column>
			<el-table-column sortable label="分成金额(元)">
				<template scope="scope">
					<span v-if="params.typeAlias == 'gys'">{{scope.row.fc_sp | coin2yuan('')}}</span>
					<span v-if="params.typeAlias == 'fwz'">{{scope.row.fc_server | coin2yuan('')}}</span>
					<span v-if="params.typeAlias == 'fws'">{{scope.row.fc_server_up | coin2yuan('')}}</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination :current-page.sync="params.page" :page-size="pageSize" @current-change="render" layout="total, prev, pager, next" :total="total" class="pagination">
		</el-pagination>
	</div>
</template>

<script>
	import {calConfig} from "../data/config.js";
	import {coin2yuan} from "../../filters/";
	export default {
		data(){
			return {
				isLoading: true,
				calConfig: calConfig,
				searched: false,
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
				params:{
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
		filters:{
			coin2yuan
		},
		computed:{
			svalHolder(){
				return this.params.typeAlias == "gys" ? "请输入供应商名" : "请输入TR商品名"
			},
			canExport(){
				return !(this.params.dateStart && this.searched && this.total>0)
			}
		},
		methods:{
			render(){
				let _this = this;
				this.isLoading = true;
				this.searched = false;
				this.$store.dispatch('divide/GET_divides', {
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
			dataExport(){
				let _this = this;
				this.$store.dispatch('download/Do_download_divide',{
					data: this.params,
					callback({status, errmsg, data}){
						if(status != "1"){
							_this.$message.error(errmsg);
							return
						}
						_this.$store.commit('download/DONE_downLoad', {
							that: _this,
							type: 52000,
							title: "分成统计导出提示",
							message: _this.params.dateStart + " 至 " + _this.params.dateEnd + '的报表文件正在生成请至下载中心下载'
						})
					}
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