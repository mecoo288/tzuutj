import Vue from 'vue';
import {
	getDivide
} from '../../../api/index.js';


const GET_divides = (stroe, parma) =>{
	return getDivide(stroe, parma)
}

export default {
	GET_divides,
}
