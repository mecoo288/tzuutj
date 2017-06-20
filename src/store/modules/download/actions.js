import Vue from 'vue';
import {
	getDownload
} from '../../../api/index.js';


const GET_download = (stroe, parma) =>{
	return getDownload(stroe, parma)
}

export default {
	GET_download,
}
