import {POST, GET} from "./getData.js"

const getDownload = (scope, parma) => {
	return GET('/api/Export/getExportList', parma, scope)
} 

export {
	getDownload
}