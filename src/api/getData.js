import axios from "axios";
import qs from "qs";
import Vue from "vue";
require('es6-promise').polyfill();
const formatRes = ({status, statusText, data, ...res}, callback, {commit, dispatch, state,rootState,...ot}) =>{
	let resData = {
		status: 1,
		errmsg: "",
		code : 1,
		data: {}
	}
	if(status !== 200){
		Object.assign(resData, {
			status: 0,
			errmsg: statusText,
			code: status
		})
		return;
	}
	if(data.status == "0" && data.errno == "login_error"){
		Object.assign(resData, {
			status: 0,
			errmsg: data.msg,
			code: data.code
		});
		commit('account/logout', null, {root: true});
		// Vue.$locals("account").remove();
		// window.location.href = window.location.hash.split("#/")[0] + "#/login";
		return;
	}
	Object.assign(resData, {
		status: 1,
		data: data.data,
		errmsg: data.msg,
		code: data.code
	})
	callback(resData);
}

const POST = (url, {data = {}, callback = ()=>{}}, scope) => {
	return	axios.post(url, qs.stringify(data), {
			responseType: 'json'
		}).then(function(res){
			formatRes(res, callback, scope)
		});
}
const GET = (url, {data = {}, callback = ()=>{}}, scope) => {
	return axios.get(url, {params: data}).then(function(res){
		formatRes(res, callback,  scope)
	});;
}

export {POST, GET}