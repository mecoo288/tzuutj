import {POST, GET} from "./getData.js"

const getDownload = (scope, parma) => {
	return GET('/api/Export/getExportList', parma, scope)
}

const doReDownload = (scope, parma) => {
	return GET('/api/Export/regenerate', parma, scope)
}

const doOrderDownload = (scope, parma) => {
	return GET('/api/Export/addOrderTask', parma, scope)
}

const doWeeklyDownload = (scope, parma) => {
	return POST('/api/Export/addBdTask', parma, scope)
} 

const doTalkDownload = (scope, parma) => {
	return POST('/api/Export/addHhTask', parma, scope)
} 

const doRewardDownload = (scope, parma) => {
	return POST('/api/Export/addDsTask', parma, scope)
}

const doDivideDownload = (scope, parma) => {
	return POST('/api/Export/addFcTask', parma, scope)
}

const doProductDownload = (scope, parma) => {
	return POST('/api/Export/addProductTask', parma, scope)
} 

const doProvidertDownload = (scope, parma) => {
	return POST('/api/Export/addProviderTask', parma, scope)
} 


export {
	getDownload,
	doReDownload,
	doOrderDownload,
	doWeeklyDownload,
	doTalkDownload,
	doRewardDownload,
	doDivideDownload,
	doProductDownload,
	doProvidertDownload,
}