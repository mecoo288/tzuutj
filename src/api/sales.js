import {POST, GET} from "./getData.js"

const getSales = (scope, parma) => {
	return GET('/api/Bd/dataList', parma, scope)
} 

export {
	getSales
}