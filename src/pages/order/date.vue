<template>
	<div v-loading.lock="isLoading">
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item :to="{ path: '/order' }">订单统计</el-breadcrumb-item>
		  <el-breadcrumb-item>日期: {{params.date}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-table :data="data" style="width: 100%; margin-top: 10px" stripe>
			<el-table-column label="城市">
				<template scope="scope">
					<el-button @click="handleView(scope.row)" type="text">{{scope.row.city_name}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="orders_num" label="主订单数量"></el-table-column>
			<el-table-column prop="orders_detail_num" label="商品订单数量"></el-table-column>
			<el-table-column label="当日支付金额">
				<template scope="scope">
					{{ scope.row.pay_money | coin2yuan('') }}
				</template>
			</el-table-column>
			<el-table-column label="退单金额">
				<template scope="scope">
					{{ scope.row.refund_money | coin2yuan('') }}
				</template>
			</el-table-column>
			<el-table-column prop="refund_num" label="退单数量"></el-table-column>
			<el-table-column prop="reimburse_money" label="报账金额"></el-table-column>
			<el-table-column prop="reimburse_num" label="报账数量"></el-table-column>
			<el-table-column prop="pay_money" label="订单均价">
				<template scope="scope">
					{{scope.row.pay_money | Divide(scope.row.orders_num)}}
				</template>
			</el-table-column>
			<!-- <el-table-column label="详情">
				<template scope="scope">
					<el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column> -->
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
			handleView({date, city_name, city_code}){
				this.$router.push({path:'/order/'+ this.params.date +'/'+ city_name + "__" + city_code});
			},
			render(){
				let _this = this;
				this.isLoading = true;
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
			this.params.date = this.$route.params.date;
			this.render();
		}
	}
</script>

<style lang="less">

</style>
