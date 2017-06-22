import Vue from 'vue';
import {
	getDownload,
	doReDownload,
	doOrderDownload,
	doWeeklyDownload,
	doTalkDownload,
	doRewardDownload,
	doDivideDownload,
	doProductDownload,
	doProvidertDownload,
} from '../../../api/index.js';


const GET_download = (stroe, parma) =>{
	return getDownload(stroe, parma)
}

const Do_redownload = (stroe, parma) =>{
	return doReDownload(stroe, parma)
}

const Do_download_order = (stroe, parma) =>{
	return doOrderDownload(stroe, parma)
}

const Do_download_weekly = (stroe, parma) =>{
	return doWeeklyDownload(stroe, parma)
}

const Do_download_talk = (stroe, parma) =>{
	return doTalkDownload(stroe, parma)
}

const Do_download_reward = (stroe, parma) =>{
	return doRewardDownload(stroe, parma)
}

const Do_download_divide = (stroe, parma) =>{
	return doDivideDownload(stroe, parma)
}

const Do_download_product = (stroe, parma) =>{
	return doProductDownload(stroe, parma)
}

const Do_download_provider = (stroe, parma) =>{
	return doProvidertDownload(stroe, parma)
}

export default {
	GET_download,
	Do_redownload,
	Do_download_order,
	Do_download_weekly,
	Do_download_talk,
	Do_download_divide,
	Do_download_product,
	Do_download_provider,
}
