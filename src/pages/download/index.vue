<template>
	<div v-loading.lock="isLoading">
		<el-form :inline="true" :model="parma">
			<el-form-item label="操作类型">
				<el-select v-model="parma.oprateType" placeholder="请选择">
					<el-option v-for="item in oprateType" :key="item.val" :label="item.name" :value="item.val">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="生成状态">
				<el-select v-model="parma.exportStatus" placeholder="请选择">
					<el-option v-for="item in exportStatus" :key="item.val" :label="item.name" :value="item.val">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-table :data="data" stripe style="width: 100%">
			<el-table-column prop="pay_date" label="创建时间"></el-table-column>
			<el-table-column prop="stock_name" label="操作类型"></el-table-column>
			<el-table-column prop="sp_user_name" label="所选日期"></el-table-column>
			<el-table-column prop="pnum" label="生成状态"></el-table-column>
			<el-table-column prop="fc" label="操作"></el-table-column>
		</el-table>
		<el-pagination v-if="hasMore" :current-page.sync="parma.page" :page-size="pageSize" @current-change="render" layout="total, prev, pager, next" :total="total" class="pagination">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				isLoading: true,
				oprateType:[
					{
						name: "全部",
						val:0
					},{
						name: "订单统计导出",
						val:1
					},
				],
				exportStatus:[
					{
						name: "全部",
						val:0
					},{
						name: "已生成",
						val:1
					},{
						name: "生成中",
						val:2
					},{
						name: "生成失败",
						val:3
					},
				],
				parma:{
					typeAlias:"fws",
					searchVal: "",
					exportStatus:0,
					oprateType:0,
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
		methods:{
			render(){
				let _this = this;
				this.isLoading = true;
				this.$store.dispatch('download/GET_download', {
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
			dataExport(){
				this.$message({
					type:"warning",
					message:"功能开发中..."
				})
			}
		},
		created(){
			this.$store.commit('activMenu', 'download');
			this.render();
		}
	}
</script>

<style rel="stylesheet/less" lang="less">

</style>