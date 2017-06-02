import axios from "axios";
import qs from "qs";
import Vue from "vue";
require('es6-promise').polyfill();
const formatRes = ({status, statusText, data, ...res}, {resolve, reject}, {commit,state,rootState,...ot}) =>{
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
		reject(resData);
		return;
	}
	if(data.code === "50555"){
		Object.assign(resData, {
			status: 0,
			errmsg: data.msg,
			code: data.code
		});
		reject(resData);
		commit("logOut", data)
		return;
	}
	Object.assign(resData, {
		status: 1,
		data: data.data
	})
	resolve(resData);
	return res
}

const POST = (url, parma, scope) => {
	let res = new Promise(function(resolve, reject){
		axios.post(url, qs.stringify(parma), {
			responseType: 'json'
		}).then(function(res){
			formatRes(res, {resolve, reject}, scope)
		});
	});

	return res;
}
const GET = (url, parma = {}, scope) => {
	let res = new Promise(function(resolve, reject){
		axios.get(url, {params: parma}).then(function(res){
			formatRes(res, {resolve, reject}, scope)
		});
	});

	return res;
}

export {POST, GET}