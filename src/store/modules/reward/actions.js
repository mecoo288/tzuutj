import Vue from 'vue';
import {
	getRewards
} from '../../../api/index.js';


const GET_reward = (stroe, parma) =>{
	return getRewards(stroe, parma)
}

export default {
	GET_reward,
}
