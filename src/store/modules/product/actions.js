import Vue from 'vue';
import {
	getProducts
} from '../../../api/index.js';


const GET_products = (stroe, parma) =>{
	return getProducts(stroe, parma)
}

export default {
	GET_products,
}
