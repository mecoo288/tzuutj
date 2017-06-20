import Vue from 'vue';
import {
	getOrders
} from '../../../api/index.js';


const GET_Orders = (stroe, parma) =>{
	return getOrders(stroe, parma)
}

export default {
	GET_Orders
}
