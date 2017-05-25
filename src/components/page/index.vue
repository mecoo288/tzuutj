<template>
	<div class="homemain">
		<myheader :menus="menus" ></myheader>
		<div class="mainleft  col-sm-2 col-md-2">
			<leftmenu :leftMenu="leftMenu" ></leftmenu>
		</div>
		<div class="mainright col-sm-10 col-md-10">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import leftmenu from './common/leftmenu';
	import myheader from './header/header'
	export default{
		data(){
			return {
				leftMenu: {},
				menus:{},
			}
		},
		components: {
			leftmenu,
			myheader,
		},
	}  
</script>

<style rel="stylesheet/less" lang="less">
	@import "../../common/style/index";
	#app{
   //     margin-top:60px;
	}
	.dropdown{
		.ui.menu{
			max-height: 180px;
			overflow-y: scroll;
			width: auto;
		}
	}

</style>
