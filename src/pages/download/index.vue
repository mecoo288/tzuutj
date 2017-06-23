<template>
	<div v-loading.lock="isLoading">
		<el-form :inline="true" :model="params">
			<el-form-item label="操作类型">
				<el-select v-model="params.operateType" @change="doFilter" placeholder="请选择">
					<el-option v-for="item in operateType" :key="item.val" :label="item.name" :value="item.val" :disabled="item.disabled">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="生成状态">
				<el-select v-model="params.status" @change="doFilter" placeholder="请选择">
					<el-option v-for="item in exportStatus" :key="item.val" :label="item.name" :value="item.val">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-table :data="data" stripe style="width: 100%">
			<el-table-column prop="create_dt" label="创建时间"></el-table-column>
			<el-table-column prop="operate_type" label="操作类型"></el-table-column>
			<el-table-column prop="selectDate" label="所选日期"></el-table-column>
			<el-table-column label="生成状态">
				<template scope="scope">
					<span class="export-ing" v-if="scope.row.status == 1">生成中</span>
					<span class="export-ok" v-if="scope.row.status == 2">已生成</span>
					<span class="export-no" v-if="scope.row.status == 3">生成失败</span>
				</template>
			</el-table-column>
			<el-table-column prop="fc" label="操作">
				<template scope="scope">
					<i class="el-icon-loading" v-if="scope.row.status == 1"></i>
					<el-button v-if="scope.row.status == 2" @click.native.prevent="handle(scope.row)" type="text">
						下载
					</el-button>
					<el-button v-if="scope.row.status == 3" type="primary" @click.native.prevent="handle(scope.row)" size="mini">
						重新导出
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination v-if="hasMore || (!hasMore && params.page>1)" :current-page.sync="params.page" :page-size="pageSize" @current-change="render" layout="total, prev, pager, next" :total="total" class="pagination">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				isLoading: true,
				operateType:[
				{
					name: "订单统计",
					val:51000,
					disabled: true,
				},{
					name: "服务者统计",
					val:56000,
					disabled: true,
				},{
					name: "BD销售统计",
					val:50000,
					disabled: false,
				},{
					name: "分成统计",
					val:52000,
					disabled: true,
				},{
					name: "商品统计",
					val:53000,
					disabled: true,
				},{
					name: "会话统计",
					val:54000,
					disabled: true,
				},{
					name: "打赏统计",
					val:55000,
					disabled: true,
				},
				],
				exportStatus:[
				{
					name: "全部",
					val:0
				},{
					name: "生成中",
					val:1
				},{
					name: "已生成",
					val:2
				},{
					name: "生成失败",
					val:3
				},
				],
				params:{
					status: 0,
					page: 1,
					operateType: 50000,
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
					data: _this.params,
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
			handle(item){
				if(item.status == 2){
					window.location.href= item.oss_address;
					return;
				}
				this.toReDownload(item)
			},
			toReDownload(item){

				this.$confirm('确定重新生成当前导出？', '导出提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.reDownload(item);
				})
			},
			reDownload({id}){
				let _this = this;
				this.$store.dispatch('download/Do_redownload', {
					data: {taskId: id},
					callback({status, errmsg, data}){
						_this.isLoading = false;
						if(status != "1"){
							_this.$message.error(errmsg);
							return
						}
						_this.$message({
							message: '恭喜你，重新导出请求已发出',
							type: 'success'
						});
					}
				})
			},
			doFilter(){
				this.params.page =1;
				this.render();
			},
			setDate(date){
				let [start="", end=""] = date.split(" - ");
				this.params.dateStart = start;
				this.params.dateEnd = end;
			},
			dataExport(){
				this.$message({
					type:"warning",
					message:"功能开发中..."
				})
			}
		},
		created(){
			this.params.operateType = this.$route.params.type * 1 || 50000;
			this.$store.commit('activMenu', 'download');
			this.render();
		}
	}
</script>

<style rel="stylesheet/less" lang="less">
	.export{
		&-no{
			color: #FF4949
		}
		&-ing{
			color: #F7BA2A
		}
		&-ok{
			color: #13CE66
		}
	}
</style>