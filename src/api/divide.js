import {POST, GET} from "./getData.js"

const getDivide = (scope, parma) => {
	return GET('/api/fc/dataList', parma, scope)
} 

export {
	getDivide
}