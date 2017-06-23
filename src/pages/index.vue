<template>
	<div>
		<mheader></mheader>
		<section class="layout">
			<aside class="left-nav">
				<el-menu mode="vertical" default-active="1" class="nav-items"  theme="dark">
					<el-menu-item :index='menu.url' @click="openPage(menu.url)" class="nav-items-item" :class=" {'is-active' : menu.alias === alias }" v-for="menu in leftMenu">{{menu.name}}</el-menu-item>
				</el-menu>
			</el-col>
		</aside>
		<section class="main-content">
			<router-view class="content-wrap"></router-view>
		</section>
	</section>
</div>
</template>

<script>
	// import {leftMenu} from './data/config';
	import mheader from './components/header/';
	export default{
		data(){
			return {
				// leftMenu,
				menus: [],
			}
		},
		methods:{
			openPage(page){
				this.$router.push(page.split("#")[1]);
			},
			getMenus(){
				let _this = this;
				this.$store.dispatch('account/GET_menus', {
					callback({status, errmsg, data}){
						if(status != "1"){
							_this.$message.error(errmsg);
							return
						}
						_this.$store.commit('setMenus',{that: _this, menus:data});
					}
				})
			},
			setMenu(){

			}
		},
		computed: {
			alias(){
				return this.$store.state.menuActived;
			},
			leftMenu(){
				return this.$store.state.leftMenus;
			}
		},
		mounted(){
			this.getMenus();
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
