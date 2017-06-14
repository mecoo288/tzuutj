import Vue from 'vue';
import {getSales} from '../../../api/index.js';



const GET_sales = (stroe, parma) => {
  return  getSales(stroe, parma)
}

export default {
	GET_sales
}
