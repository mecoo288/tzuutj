import axios from "axios";
import qs from "qs";
import Vue from "vue";
require('es6-promise').polyfill();
const formatRes = ({status, statusText, data, ...res}, callback, {commit, dispatch, state,rootState,...ot}) =>{
	let resData =Object.assign({}, data);
	if(status !== 200){
		Object.assign(resData, {
			status: 0,
			errmsg: statusText,
			errno: status
		});
		callback(resData)
		return;
	}
	if(data.status == "0" && data.errno == "no_login"){
		commit('account/logout', null, {root: true});
		return;
	}
	callback(resData);
}

const filterData = (data) => {
	let res = {}
	for(let key in (data)){
		if(!/^__.*$/.test(key)){
			res[key] = data[key]
		}
	}
	return res;
}

const POST = (url, {data = {}, callback = ()=>{}}, scope) => {
	return	axios.post(url, qs.stringify( filterData(data) ), {
		responseType: 'json'
	}).then(function(res){
		formatRes(res, callback, scope)
	}).catch(function ({message, response, ...ot}) {
		formatRes({status: response ? response.status : 0, statusText: message, data:{}}, callback,  scope)
	});
}
const GET = (url, {data = {}, callback = ()=>{}}, scope) => {
	return axios.get(url, {params: filterData(data) }).then(function(res){
		formatRes(res, callback,  scope)
	}).catch(function ({message, response, ...ot}) {
		formatRes({status: response ? response.status : 0, statusText: message, data:{}}, callback,  scope)
	});
}

export {POST, GET}