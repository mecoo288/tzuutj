<template>
	<div>
		<mheader></mheader>
		<section class="layout">
			<aside class="left-nav">
				<el-menu mode="vertical" default-active="1" class="nav-items"  theme="dark">
					<el-menu-item :index='menu.url' @click="openPage(menu.url)" class="nav-items-item" :class=" {'is-active' : menu.alias === alias }" v-for="menu in leftMenu">{{menu.name}}</el-menu-item>
				</el-menu>
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
			checkPath(path, next = ()=>{}){
				
			},
		},
		computed: {
			alias(){
				return this.$store.state.menuActived;
			},
			leftMenu(){
				return this.$store.state.leftMenus;
			}
		},
		created(){
			let _this = this;
			this.getMenus();
			// this.$router.beforeEach((to, from, next)=>{
			// 	// if(!_this.$store.state.limitPath[to.path]){
			// 	// 	console.log(111);
			// 	// 	_this.$router.push({path:'/p404'});
			// 	// 	return;
			// 	// }
			// 	if(_this.$route.path != "/p404"){
			// 		next('/p404')
			// 	}
			// 	next();
			// });
		},
		components:{
			mheader
		}
	}  
</script>
<style lang="less">
	@import "../static/style/base";
</style>
