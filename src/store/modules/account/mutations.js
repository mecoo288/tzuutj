import Vue from 'vue'
const logout = (state)=>{
	Vue.$locals("account").remove();
	window.location.href = window.location.hash.split("#/")[0] + "#/login";
}
export default{
	logout
}