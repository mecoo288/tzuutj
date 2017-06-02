import {POST, GET} from "./getData.js"

const getCity = (scope, parma) => {
	return GET('/api/common/getUserCitys', parma, scope)
} 
const getTjBoth = (scope, parma) => {
	return POST('/api/Tongji/TjBoth', parma, scope)
} 
const getOrder = (scope, parma) => {
	return GET('/api/Tongji/order', parma, scope)
}
const getProvider = (scope, parma) => {
	return GET('/api/tongji/fwz', parma, scope)
}

export {
	getCity,
	getTjBoth,
	getOrder,
	getProvider
}