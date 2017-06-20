import {POST, GET} from "./getData.js"

const getProviders = (scope, parma) => {
	return GET('/api/fwz/dataList', parma, scope)
} 

export {
	getProviders
}