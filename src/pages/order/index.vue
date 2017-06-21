<template>
	<div v-loading.lock="isLoading">
		<el-form :inline="true" v-model="parma" class="demo-form-inline">
			<el-form-item>
				<sel-city @change="cityChange"></sel-city>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="服务商姓名" v-model="parma.fwsName"></el-input>
			</el-form-item>
			<el-form-item label="筛选日期">
				<el-date-picker :editable="false" v-model="parma.__dateRange" @change="setDate" type="daterange" align="left" placeholder="选择日期范围" :picker-options="calConfig">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="exportData">导出</el-button>
			</el-form-item>
		</el-form>
		<el-tabs type="border-card" @tab-click="Do_activeTab" v-model="activedTab">
			<el-tab-pane name="mainOrder" label="主订单数量">
				<highcharts  :options="mainOrder.options" ref="highcharts"></highcharts>
			</el-tab-pane>
			<el-tab-pane name="product" label="商品订单数量">
				<highcharts  :options="product.options" ref="highcharts"></highcharts>
			</el-tab-pane>
			<el-tab-pane name="payMoney" label="当日支付金额">
				<highcharts  :options="payMoney.options" ref="highcharts"></highcharts>
			</el-tab-pane>
			<el-tab-pane name="reFound" label="退单金额">
				<highcharts  :options="reFound.options" ref="highcharts"></highcharts>
			</el-tab-pane>
			<el-tab-pane name="backNum" label="退单数量">
				<highcharts  :options="backNum.options" ref="highcharts"></highcharts>
			</el-tab-pane>
			<el-tab-pane name="allMoney" label="报账金额">
				<highcharts  :options="allMoney.options" ref="highcharts"></highcharts>
			</el-tab-pane>
			<el-tab-pane name="allNum" label="报账数量">
				<highcharts  :options="allNum.options" ref="highcharts"></highcharts>
			</el-tab-pane>
			<el-tab-pane name="avaragePrice" label="订单均价">
				<highcharts  :options="avaragePrice.options" ref="highcharts"></highcharts>
			</el-tab-pane>
		</el-tabs>
		<el-table :data="data" style="width: 100%; margin-top: 10px" stripe>
			<el-table-column prop="date" label="日期"></el-table-column>
			<el-table-column prop="orders_num" label="主订单数量"></el-table-column>
			<el-table-column prop="orders_detail_num" label="商品订单数量"></el-table-column>
			<el-table-column label="当日支付金额(元)">
				<template scope="scope">
					{{ scope.row.pay_money | coin2yuan('') }}
				</template>
			</el-table-column>
			<el-table-column label="退单金额(元)">
				<template scope="scope">
					{{ scope.row.refund_money | coin2yuan('') }}
				</template>
			</el-table-column>
			<el-table-column prop="refund_num" label="退单数量"></el-table-column>
			<el-table-column label="报账金额(元)">
				<template scope="scope">
					{{ scope.row.reimburse_money | coin2yuan('') }}
				</template>
			</el-table-column>
			<el-table-column prop="reimburse_num" label="报账数量"></el-table-column>
			<el-table-column label="订单均价(元)">
				<template scope="scope">
					{{scope.row.pay_money | Divide(scope.row.orders_num) | coin2yuan('')}}
				</template>
			</el-table-column>
			<el-table-column label="详情">
				<template scope="scope">
					<el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination v-if="hasMore && parma.dateStart" :current-page.sync="parma.page" :page-size="pageSize" @current-change="pageChange" layout="total, prev, pager, next" :total="total" class="pagination">
		</el-pagination>
	</div>
</template>

<script>
	import selCity from "../components/citys/";
	import {calConfig, chartConfig} from "../data/config.js";
	import {Divide, coin2yuan} from "../../filters/";
	let config = JSON.stringify(chartConfig);
	export default {
		data(){
			return {
				isLoading: true,
				calConfig:calConfig,
				parma:{
					__dateRange:[],
					cityCode: 0,
					cityName:'全部',
					fwsName:'',
					dateStart:'',
					dateEnd:'',
					type:1,
					threeType:'',
					page:1,
					pageNum:20,
				},
				data:[],
				hasMore: false,
				pageNum: 20,
				total: 0,

				mainOrder:{
					options:Object.assign(JSON.parse(config), {
						title: {
							text: '主订单数量'
						},
						yAxis:[{
							title:{
								text:"(单位: 单)"
							},
							labels: {
								format: '{value}'
							}
						}],
					})
				},
				product:{
					options:Object.assign(JSON.parse(config), {
						title: {
							text: '商品订单数量'
						},
						yAxis:[{
							title:{
								text:"(单位: 单)"
							},
							labels: {
								format: '{value}'
							}
						}],
					})
				},
				payMoney:{
					options:Object.assign(JSON.parse(config), {
						title: {
							text: '当日支付金额'
						},
						yAxis:[{
							title:{
								text:"(单位: 元)"
							},
							labels: {
								format: '{value}'
							}
						}],
					})
				},
				reFound:{
					options:Object.assign(JSON.parse(config), {
						title: {
							text: '退单金额'
						},
						yAxis:[{
							title:{
								text:"(单位: 元)"
							},
							labels: {
								format: '{value}'
							}
						}],
					})
				},
				backNum:{
					options:Object.assign(JSON.parse(config), {
						title: {
							text: '退单数量'
						},
						yAxis:[{
							title:{
								text:"(单位: 单)"
							},
							labels: {
								format: '{value}'
							}
						}],
					})
				},
				allMoney:{
					options:Object.assign(JSON.parse(config), {
						title: {
							text: '报账金额'
						},
						yAxis:[{
							title:{
								text:"(单位: 元)"
							},
							labels: {
								format: '{value}'
							}
						}],
					})
				},
				allNum:{
					options:Object.assign(JSON.parse(config), {
						title: {
							text: '报账数量'
						},
						yAxis:[{
							title:{
								text:"(单位: 条)"
							},
							labels: {
								format: '{value}'
							}
						}],
					})
				},
				avaragePrice:{
					options:Object.assign(JSON.parse(config), {
						title: {
							text: '订单均价'
						},
						yAxis:[{
							title:{
								text:"(单位: 元)"
							},
							labels: {
								format: '{value}'
							}
						}],
					})
				},
			}
		},
		filters:{
			Divide,
			coin2yuan,
		},
		computed:{
			activedTab(){
				return this.Query.to || "mainOrder";
			},
			Query(){
				return this.$route.query
			}
		},
		components:{
			selCity
		},
		methods:{
			search(){
				let query = Object.assign({}, this.Query, {cityCode: this.parma.cityCode, cityName: this.parma.cityName});
				if(query.cityCode == 0){
					delete query.cityCode;
					delete query.cityName;
				}
				this.parma.page = 1;
				this.goPage(query)
				this.render();
			},
			handleView(item){
				let link = '/order/'+item.date;
				if(this.Query.cityCode && this.Query.cityCode != 0){
					link += "/"+ this.Query.cityCode
				}
				this.$router.push({path:link});
				// query.type = type||1;
				// if(item.city_code){
				// 	query.cityCode = item.city_code
				// }
			},
			cityChange(city){
				this.parma.cityCode = city.code;
				this.parma.cityName = city.name;
			},
			setDate(date){
				let [start="", end=""] = date.split(" - ");
				this.parma.dateStart = start;
				this.parma.dateEnd = end;
			},
			exportData(){
				console.log("导出")
			},
			Do_activeTab({name, ...ot}){
				this.Go_tag({to:name});
			},
			Go_tag(query){
				this.goPage(query);
			},
			goPage(query){
				this.$router.push({path:'/order', query:query});
			},
			render(query){
				let _this = this;
				this.isLoading = true;
				this.$store.dispatch('orders/GET_Orders', {
					data: Object.assign({}, this.parma, this.Query),
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
						_this.updateChart();
					}
				})
			},
			updateChart(){
				if(this.parma.page !== 1){
					return;
				}
				let mainOrderArr = [],
				productArr = [],
				payMoneyArr = [],
				reFoundArr = [],
				backNumArr = [],
				allMoneyArr = [],
				allNumArr = [],
				avaragePriceArr = [];
				
				this.data.forEach(({date, orders_num, orders_detail_num, pay_money, refund_money, refund_num,  reimburse_money, reimburse_num})=>{
					date = Date.parse(date);
					mainOrderArr.unshift([date, orders_num]);
					productArr.unshift([date, orders_detail_num]);
					payMoneyArr.unshift([date, coin2yuan(pay_money)]);
					reFoundArr.unshift([date, coin2yuan(refund_money)]);
					backNumArr.unshift([date, refund_num]);
					allMoneyArr.unshift([date, coin2yuan(reimburse_money)]);
					allNumArr.unshift([date, reimburse_num]);
					avaragePriceArr.unshift([date, coin2yuan( Divide(pay_money, orders_num) )]);
				});
				this.mainOrder.options.series[0].data = mainOrderArr;
				this.product.options.series[0].data = productArr;
				this.payMoney.options.series[0].data = payMoneyArr;
				this.reFound.options.series[0].data = reFoundArr;
				this.backNum.options.series[0].data = backNumArr;
				this.allMoney.options.series[0].data = allMoneyArr;
				this.allNum.options.series[0].data = allNumArr;
				this.avaragePrice.options.series[0].data = avaragePriceArr;
			},
			pageChange(page){
				this.parma.page = page;
				this.render();
			},
		},
		created(){
			this.Query = this.$route.query;
			this.$store.commit('activMenu', 'order');
			this.showLv = this.Query.type || 1;
			this.render({type: this.showLv});
		}
	}
</script>

<style lang="less">

</style>
