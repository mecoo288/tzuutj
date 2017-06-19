import {POST, GET} from "./getData.js"

const getOrders = (scope, parma) => {
	return GET('/api/dd/dataList', parma, scope)
}  

export {
	getOrders
}