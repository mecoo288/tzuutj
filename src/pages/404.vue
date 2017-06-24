<template>
	<div>
		<mheader></mheader>
		<section class="layout">
			<section class="main-content p404">
				404 Not Fond
				<div class="p404-action">
					你可以选择
					<router-link class="link" to="/home">回到首页</router-link>
					或
					<el-button class="link" type="text" @click="back">返回上页</el-button>
				</div>
			</section>
		</section>
	</div>
</template>

<script>
	import mheader from './components/header/';
	export default{
		data(){
			return {

			}
		},
		methods:{
			back(){
				window.history.back();
			}
		},
		components:{
			mheader
		}
	}  
</script>
<style lang="less">
	.p404{
		text-align: center;
		padding-top: 60px;
		font-size: 40px;
		&-action{
			font-size: 14px;
		}
		.link{
			color: #20a0ff;
			text-decoration: none;
		}
	}
</style>
