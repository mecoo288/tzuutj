import Vue from 'vue';
import {doLogin} from '../../../api/index.js';

const Do_login = (stroe, parma) =>{
  return doLogin(stroe, parma)
}

export default {
	Do_login
}
