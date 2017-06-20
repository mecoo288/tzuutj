import {POST, GET} from "./getData.js"

const getDownload = (scope, parma) => {
	return GET('/api/sp/dataList', parma, scope)
} 

export {
	getDownload
}