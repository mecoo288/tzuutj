import {POST, GET} from "./getData.js"


const doLogin = (scope, parma) => {
	return POST('/api/User/login', parma, scope)
}

const doLogout = (scope, parma) => {
	return POST('/api/User/loginOut', parma, scope)
}

const doChangePWD = (scope, parma) => {
	return POST('/api/User/modifyPwd', parma, scope)
}

const getMenus = (scope, parma) => {
	return POST('/api/Common/menus', parma, scope)
}

const getCity = (scope, parma) => {
	let {state, rootState} = scope,
		callback = parma.callback;

	if(rootState.account.citys){
		return callback(rootState.account.citys);
	};
	parma.callback = (res)=>{
		if(res.data.length > 0){
			rootState.account.citys = res;
		}
		return callback(res);
	}
	return GET('/api/common/getUserCitys', parma, scope)
}

export {
	doLogin,
	doLogout,
	getCity,
	doChangePWD,
	getMenus,
}