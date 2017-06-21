<template>
	<div>
		<el-breadcrumb separator="/" class="guid">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/order' }">订单统计</el-breadcrumb-item>
		  <el-breadcrumb-item>日期: {{params.date}}</el-breadcrumb-item>
		  <el-breadcrumb-item>{{params.cityName}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-table :data="data" style="width: 100%; margin-top: 10px" stripe>
			<el-table-column prop="fws_name" label="服务商"></el-table-column>
			<el-table-column prop="orders_num" label="主订单数量"></el-table-column>
			<el-table-column prop="orders_detail_num" label="商品订单数量"></el-table-column>
			<el-table-column label="当日支付金额">
				<template scope="scope">
					{{ scope.row.pay_money | coin2yuan('') }}
				</template>
			</el-table-column>
			<el-table-column prop="refund_money" label="退单金额">
				<template scope="scope">
					{{ scope.row.refund_money | coin2yuan('') }}
				</template>
			</el-table-column>
			<el-table-column prop="refund_num" label="退单数量"></el-table-column>
			<el-table-column prop="reimburse_money" label="报账金额"></el-table-column>
			<el-table-column prop="reimburse_num" label="报账数量"></el-table-column>
			<el-table-column label="订单均价">
				<template scope="scope">
					{{scope.row.pay_money | Divide(scope.row.orders_num)}}
				</template>
			</el-table-column>
		</el-table>
		<el-pagination v-if="hasMore && parma.dateStart" :current-page.sync="parma.page" :page-size="pageSize" @current-change="pageChange" layout="total, prev, pager, next" :total="total" class="pagination">
		</el-pagination>
	</div>
</template>

<script>
	import {Divide, coin2yuan} from "../../filters/";
	export default {
		data(){
			return {
				isLoading: false,
				cityName:"",
				params:{
					date: "",
					page: 1,
					type: 2
				},
				data: [],
				total: 0,
				pageSize: 20,
				hasMore: false,
			}	
		},
		filters:{
			Divide,
			coin2yuan
		},
		methods:{
			render(){
				let _this = this;
				this.$store.dispatch('orders/GET_Orders', {
					data: this.params,
					callback({status, errmsg, data}){
						_this.isLoading = false;
						if(status != "1"){
							_this.$message.error(errmsg);
							return
						}
						_this.data = data.list;
						_this.hasMore = data.hasMore;
						_this.pageNum = data.length;
						_this.total = data.total;
					}
				})
			},
		},
		created(){
			this.$store.commit('activMenu', 'order');
			let {date, cityCode} = this.$route.params;
			Object.assign(this.params, {
				date: date,
				cityCode: cityCode.split("_")[0],
				cityName: cityCode.split("_")[1],
			})
			this.render();
		}
	}
</script>

<style lang="less">
	.guid{
		padding: 15px 0;
	}
</style>
