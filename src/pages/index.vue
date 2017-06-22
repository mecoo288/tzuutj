<template>
	<div style="height:100%">
		<mheader></mheader>
		<div class="content">
			<el-row class="nav">	  
			  <el-col>
			    <el-menu mode="vertical" default-active="1" class="nav-items"  theme="dark">
			      <el-menu-item :index='menu.url' @click="openPage(menu.url)" class="nav-items-item" :class=" {'is-active' : menu.alias === alias }" v-for="menu in leftMenu">{{menu.name}}</el-menu-item>
			    </el-menu>
			  </el-col>
			</el-row>
			<div class="body">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import {leftMenu} from './data/config';
import mheader from './components/header/';
export default{
	data(){
		return {
			leftMenu
		}
	},
	methods:{
		openPage(page){
			this.$router.push(page.split("#")[1]);
		},
		logout(){

	        this.$cookie.delete('txy_name')
			this.$cookie.delete('txy_token')
			this.$cookie.delete('cookieLogin')

			this.$router.push('/login')
			this.$store.dispatch('logout')	
	    }
	},
	computed: {
		alias(){
			return this.$store.state.menuActived;
		}
	},
	components:{
		mheader
	}
}  
</script>

<style rel="stylesheet/less" lang="less">
	html, body{
		padding: 0;
		margin: 0;
		overflow: hidden;
		height: 100%; 
	}
	.content{
		display: flex;
		display: -webkit-flex;
		height: 100%;
		display: border-box;
		.nav{
			width: 240px;
			height: 100%;
			&-items{
				&-item{
					font-size: 16px;
				}
			}
		}
		.body{
			padding: 10px 0;
			-webkit-flex:1;
			margin-left: 10px;
			flex:1;
			height: 100%;
			overflow-x: hidden;
			overflow-y: scroll;
		}
	}
	
</style>
