<template>
	<div>
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
			<el-tab-pane name="mainOrder" label="主订单数量"></el-tab-pane>
			<el-tab-pane name="product" label="商品订单数量"></el-tab-pane>
			<el-tab-pane name="payMoney" label="当日支付金额"></el-tab-pane>
			<el-tab-pane name="reFound" label="退单金额"></el-tab-pane>
			<el-tab-pane name="backNum" label="退单数量"></el-tab-pane>
			<el-tab-pane name="allMoney" label="报账金额"></el-tab-pane>
			<el-tab-pane name="allNum" label="报账数量"></el-tab-pane>
			<el-tab-pane name="avaragePrice" label="订单均价"></el-tab-pane>
		</el-tabs>
	</div>

</template>

<script>
	import selCity from "../components/citys/";
	import {calConfig} from "../data/config.js";
	export default {
		data(){
			return {
				Query:{},
				calConfig:calConfig,
				parma:{
					__dateRange:[],
					cityCode: 0,
					fwsName:'',
					dateStart:'',
					dateEnd:'',
					type:'',
					threeType:'',
					page:1,
					pageNum:'',
					no_page:1
				},
			}
		},
		computed:{
			activedTab(){
				return this.Query.to || "mainOrder";
			},
		},
		components:{
			selCity
		},
		methods:{
			search(){
				console.log(this.parma);
			},
			cityChange(city){
				this.parma.cityCode = city.code
			},
			setDate(date){
				let [start="", end=""] = date.split(" - ");
				this.parma.dateStart = start;
				this.parma.dateEnd = end;
			},
			getData({data, callback}){
				let _this = this;
				this.isLoading = true;
				this.$store.dispatch('orders/GET_Orders', {
		          data: data,
		          callback(res){
		            _this.isLoading = false;
		            if(res.status != "1"){
		              _this.$message.error(res.errmsg);
		              return
		            }
		            callback(res);
		          }
		        })
			},
			exportData(){
				console.log("导出")
			},
			Do_activeTab({name, ...ot}){
				this.Go_tag({to:name});
			},
			Go_tag(query){
				this.Query = query;
				this.goPage(query);
			},
			goPage(query){
				this.$router.push({path:'/order', query:query});
				this.Query = query;
				this.render(query)
			},
			fixParma(){
				this.Query.to = this.activedTab;
			},
			render(query){
				let _this = this;
				this.getData({
					data: this.parma,
					callback(res){
						console.log(res);
					}
				})
			}
		},
		created(){
			this.Query = this.$route.query;
			this.$store.commit('activMenu', 'order');
			this.render();
		}
	}
</script>

<style lang="less">

</style>
