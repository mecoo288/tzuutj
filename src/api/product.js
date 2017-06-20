import {POST, GET} from "./getData.js"

const getProducts = (scope, parma) => {
	return GET('/api/sp/dataList', parma, scope)
} 

export {
	getProducts
}