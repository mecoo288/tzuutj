import Vue from 'vue';
import {
	getProviders
} from '../../../api/index.js';


const GET_provider = (stroe, parma) =>{
	return getProviders(stroe, parma)
}

export default {
	GET_provider,
}
