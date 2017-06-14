import {POST, GET} from "./getData.js"


const doLogin = (scope, parma) => {
	return POST('/api/User/login', parma, scope)
}
const doLogout = (scope, parma) => {
	return POST('/api/User/loginOut', parma, scope)
}
export {
	doLogin,
	doLogout
}