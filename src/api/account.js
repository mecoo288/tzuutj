import {POST, GET} from "./getData.js"


const doLogin = (scope, parma) => {
	return POST('/api/user/login', parma, scope)
}

export {
	doLogin
}