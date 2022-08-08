export const randomColor = ()=>{
    
	const simbolos = "0123456789ABCDEF";
	let color = "#";

	for(let i = 0; i < 6; i++){
		color = color + simbolos[Math.floor(Math.random() * 15)];
	}

    return color
}