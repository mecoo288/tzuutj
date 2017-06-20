import {POST, GET} from "./getData.js"

const getRewards = (scope, parma) => {
	return GET('/api/ds/dataList', parma, scope)
} 

export {
	getRewards
}