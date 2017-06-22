import Vue from 'vue';
import {
	getReport,
	getRank,
	getQuery,
	getWeekly,
	getBdName,
	doDlWeekly
} from '../../../api/index.js';


const GET_report = (stroe, parma) =>{
	return getReport(stroe, parma)
}

const GET_rank = (stroe, parma) =>{
	return getRank(stroe, parma)
}

const GET_query = (stroe, parma) =>{
	return getQuery(stroe, parma)
}

const GET_weekly = (stroe, parma) =>{
	return getWeekly(stroe, parma)
}

const GET_bdName = (stroe, parma) =>{
	return getBdName(stroe, parma)
}

export default {
	GET_report,
	GET_rank,
	GET_query,
	GET_weekly,
	GET_bdName,
}
