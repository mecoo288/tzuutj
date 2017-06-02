<template>
	<div v-if="menus" >
		<div class="ui   vertical menu inverted leftmenu"> 
			<a  :href="menu.url" class="item"   :class=" {active : menu.alias === alias }"  v-for="menu in menus">
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
