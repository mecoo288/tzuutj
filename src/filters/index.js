const Divide = (x, y) =>{
	if(y == "0"){
		return 0;
	}
	return Math.round((x / y) * 100)/100;
}

const Percentage = (x, y) => {
	return (Divide(x, y) * 100) +"%"
}

const coin2yuan = (x) => {
	return Math.round(x) / 100
}
export{
	Divide,
	Percentage,
	coin2yuan,
}