<template>
	<div style="height:100%">
		<!-- <myheader :menus="menus" ></myheader> -->
		<!-- <div class="mainleft  col-sm-2 col-md-2">
			<leftmenu :leftMenu="leftMenu" ></leftmenu>
		</div> -->
		<header>
			<el-menu mode="horizontal">
			  <el-submenu index="2">
			    <template slot="title">我的</template>
			    <el-menu-item index="2-1">账户管理</el-menu-item>
			    <el-menu-item index="2-2">修改密码</el-menu-item>
			    <el-menu-item index="2-3">退出</el-menu-item>
			  </el-submenu>
			</el-menu>
		</header>
		<div class="content">
			<el-row class="nav">	  
			  <el-col>
			    <el-menu mode="vertical" default-active="1" class="nav-items">
			      <el-menu-item  :index='ind' @click="openPage(menu.url)" class="nav-items-item" :class=" {is_active : menu.alias === alias }" v-for="menu, ind in menus"><a :href="menu.url">{{menu.name}}</a></el-menu-item>
			    </el-menu>
			  </el-col>
			</el-row>
			<div class="body">
				<router-view></router-view>
			</div>
		</div>
		<!-- <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="1">处理中心</el-menu-item>
		  <el-submenu index="2">
		    <template slot="title">我的工作台</template>
		    <el-menu-item index="2-1">选项1</el-menu-item>
		    <el-menu-item index="2-2">选项2</el-menu-item>
		    <el-menu-item index="2-3">选项3</el-menu-item>
		  </el-submenu>
		  <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
		</el-menu>
		
		<el-row class="tac">	  
		  <el-col :span="8">
		    <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
		      <el-menu-item-group title="分组一">
		        <el-menu-item index="1"><i class="el-icon-message"></i>导航一</el-menu-item>
		        <el-menu-item index="2"><i class="el-icon-message"></i>导航二</el-menu-item>
		      </el-menu-item-group>
		      <el-menu-item-group title="分组二">
		        <el-menu-item index="3"><i class="el-icon-message"></i>导航三</el-menu-item>
		        <el-menu-item index="4"><i class="el-icon-message"></i>导航四</el-menu-item>
		      </el-menu-item-group>
		    </el-menu>
		  </el-col>
		</el-row>


		<div class="mainright col-sm-10 col-md-10">
			<router-view></router-view>
		</div> -->
	</div>
</template>

<script>
import menus from '../data/leftMenu.json';
export default{
	data(){
		return {
			leftMenu: {},
			menus
		}
	},
	methods:{
		openPage(page){
			this.$router.push(page)
		}
	},
	computed: {
		alias(){
			return this.$store.state.menuActived;
		}
	},
}  
</script>

<style rel="stylesheet/less" lang="less">
	@headerHeight: 60px;
	/* k.liu */
	header{
		position: fixed;
		background-color: #f00;
		height: @headerHeight;
		left: 0;
		top: 0;
		right: 0;
		z-index: 5;
	}
	.content{
		display: flex;
		display: -webkit-flex;
		padding-top: @headerHeight;
		height: 100%;
		display: border-box;
		.nav{
			width: 240px;
			height: 100%;
			background-color: #eef1f6;
			&-items{
				background-color: #34495e;
				&-item{
					font-size: 16px;
					a{
						color: #bfc6ce;
						text-decoration: none;
					}
					&.is-active a{
						color: #fff;
					}
				}
			}
		}
		.body{
			padding-top: 1px;
			margin-top: -1px;
			-webkit-flex:1;
			margin-left: 10px;
			flex:1;
			height: 100%;
			overflow-x: hidden;
			overflow-y: scroll;
		}
	}
	
</style>
