import {POST, GET} from "./getData.js"

const getTalks = (scope, parma) => {
	return GET('/api/hh/dataList', parma, scope)
} 

export {
	getTalks
}