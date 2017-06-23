const logout = () =>{
	window.localStorage.removeItem('account')
	window.location.href = window.location.hash.split("#/")[0] + "#/login";
}
export default{
	logout
}