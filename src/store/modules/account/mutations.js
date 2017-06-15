import Vue from 'vue'
const logout = (state)=>{
	window.localStorage.removeItem('account')
	window.location.href = window.location.hash.split("#/")[0] + "#/login";
}
export default{
	logout
}