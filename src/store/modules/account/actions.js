import Vue from 'vue';
import {doLogin, doLogout} from '../../../api/index.js';

const Do_login = (stroe, parma) =>{
  return doLogin(stroe, parma)
}
const Do_logout = (stroe, parma) =>{
  return doLogout(stroe, parma)
}

export default {
	Do_login,
	Do_logout
}
