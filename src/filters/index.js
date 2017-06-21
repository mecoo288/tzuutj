const Divide = (x, y) =>{
	if(y == "0"){
		return 0;
	}
	return Math.round((x / y) * 100)/100;
}

const Percentage = (x, y) => {
	return (Divide(x, y) * 100) +"%"
}
export{
	Divide,
	Percentage
}