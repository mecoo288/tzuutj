import Vue from 'vue';
import {
	getTalks
} from '../../../api/index.js';


const GET_talk = (stroe, parma) =>{
	return getTalks(stroe, parma)
}

export default {
	GET_talk,
}
