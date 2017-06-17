const Divide = (x, y) =>{
	if(y == "0"){
		return 0;
	}
	return Math.round((x / y) * 100)/100;
}
export{
	Divide
}