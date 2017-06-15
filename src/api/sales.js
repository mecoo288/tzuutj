import {POST, GET} from "./getData.js"

const getReport = (scope, parma) => {
	return GET('/api/Bd/dataList', parma, scope)
} 
const getRank = (scope, parma) => {
	return GET('/api/Bd/dataList', parma, scope)
} 
const getQuery = (scope, parma) => {
	return GET('/api/Bd/dataList', parma, scope)
} 
const getWeekly = (scope, parma) => {
	return GET('/api/Bd/dataList', parma, scope)
} 

export {
	getReport,
	getRank,
	getQuery,
	getWeekly
}