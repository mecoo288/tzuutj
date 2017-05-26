import axios from "axios";
import qs from "qs";
require('es6-promise').polyfill();
const formatRes = ({status, statusText, data, ...res}, {resolve, reject}) =>{
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
	if(data.status === "50555"){
		Object.assign(resData, {
			status: 0,
			errmsg: data.msg,
			code: data.code
		})
		reject(resData);
		return;
	}
	Object.assign(resData, {
		status: 1,
		data: data.data
	})
	resolve(resData);
	return res
}

const POST = (url, parma) => {
	let res = new Promise(function(resolve, reject){
		axios.post(url, qs.stringify(parma), {
			responseType: 'json'
		}).then(function(res){
			formatRes(res, {resolve, reject})
		});
	});

	return res;
}
const GET = (url, parma = {}) => {
	let res = new Promise(function(resolve, reject){
		axios.get(url, {params: parma}).then(function(res){
			formatRes(res, {resolve, reject})
		});
	});

	return res;
}

export {POST, GET}