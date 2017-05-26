import {POST, GET} from "./getData.js"

const getCity = ({commit,state,rootState}, parma) => {
	return GET('/api/common/getUserCitys', parma)
} 
const getTjBoth = ({commit,state,rootState}, parma) => {
	return POST('/api/Tongji/TjBoth', parma)
} 
const getOrder = ({commit,state,rootState}, parma) => {
	return GET('/api/Tongji/order', parma)
}
const getProvider = ({commit,state,rootState}, parma) => {
	return GET('/api/tongji/fwz', parma)
}

export {
	getCity,
	getTjBoth,
	getOrder,
	getProvider
}