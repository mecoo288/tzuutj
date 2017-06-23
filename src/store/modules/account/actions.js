import Vue from 'vue';
import {
	doLogin, 
	doLogout,
	doChangePWD,
	getMenus,

} from '../../../api/index.js';

const Do_login = (store, parma) =>{
	return doLogin(store, parma)
}
const Do_logout = (store, {$locals, $message, $store}) =>{
	let parma = {data:{}, callback({status, data, errmsg}){
		if(status == "0") {
			$message({
				message: errmsg ? errmsg : "未知错误",
				type: 'warning'
			});
			return;
		}
		store.commit("logout");
	}}
	return doLogout(store, parma)
}
const Do_changePWD = (store, parmas) => {
	return doChangePWD(store, parmas)
}
const GET_menus = (store, parmas) => {
	return getMenus(store, parmas)
}
export default {
	Do_login,
	Do_logout,
	Do_changePWD,
	GET_menus,
}
