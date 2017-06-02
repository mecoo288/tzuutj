<template>
	<div v-if="menus" >
		<div class="ui   vertical menu inverted leftmenu"> 
			<a  :href="menu.url" class="item"   :class=" {active : menu.alias === menuActived }"  v-for="menu in menus">
				{{menu.name}}
			</a>
		</div>
	</div>
</template>
<script>
import menus from '../../data/leftMenu.json';
import {mapState, mapMutations} from 'vuex';
	export default{
		data(){
			return {
				detailShow: false,
				menus,
				world: ""
			}
		},
		computed: mapState([
				'menuActived'
		]),
		methods:{
			...mapMutations([
					'activMenu'
				])
		},
		created(){
			let _this = this;
			setInterval(function(){
				let v = Math.random();
				_this.activMenu(v);
			},2000);
		}
	}
</script>
<style rel="stylesheet/less" lang="less">

	.leftmenu {
	 //color:red;

	 .active.item{
	 	background:#2c3f50 !important;
	 }
	 .item{
	 	height:60px;
	 	padding:0 !important;
	 	text-align: center;
	 	line-height: 60px !important;
	 	font-size:16px;
	 	color:#bfc6ce !important;
	        //padding-left:90px !important;

	    }
	}

</style>
