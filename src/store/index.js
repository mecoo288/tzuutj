import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import state from './state'
import home from './modules/home/'
import limits from './modules/limits/'
import account from './modules/account/'
import product from './modules/product/'
import sales from './modules/sales/'
import orders from './modules/orders/'
import divide from './modules/divide/'
import download from './modules/download/'
import reward from './modules/reward/'
import talk from './modules/talk/'
import provider from './modules/provider/'

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules:{
		home,
		limits,
		account,
		sales,
		orders,
		product,
		divide,
		download,
		reward,
		talk,
		provider,
    }
});
