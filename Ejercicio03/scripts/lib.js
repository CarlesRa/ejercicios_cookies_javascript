
function getRegexFecha() {
	
	return /(\d{2}[/]\d{2}[/]\d{4}$)/;
}		

function esFechaValida(fecha) {	

	let fechaAux = fecha.split('/');
	let esCorrecta = false;	

	//Máximo 31 días
	if (fechaAux[1] == 1 ||
			fechaAux[1] == 3 ||
			fechaAux[1] == 5 ||
			fechaAux[1] == 7 ||
			fechaAux[1] == 8 ||
			fechaAux[1] == 10 ||
			fechaAux[1] == 12) {	
		if ((fechaAux[0] > 0 && fechaAux[0] <= 31) &&
				fechaAux[0].length === 2) {
			esCorrecta = true;
		}
	}

	//Máximo 30 dias
	else if (fechaAux[1] == 1 ||
						fechaAux[1] == 4 ||
						fechaAux[1] == 6 ||
						fechaAux[1] == 9 ||
						fechaAux[1] == 11) {

		if ((fechaAux[0] > 0 && fechaAux[0] <= 30) &&
				fechaAux[0].length === 2) {
			esCorrecta = true;
		}
	}

	//Si es bisiesto el dia tiene máximo 29, si no 28
	else if (fechaAux[1] == 2 &&
						fechaAux[0].length === 2) {	

		//Comprueba si el año es bisiesto, un año bisiesto 
		//es divisible por 4 y por 400, pero no por 100.
		if (((fechaAux[2] % 4 == 0) && 
					(fechaAux[2] % 100 != 0)) || (fechaAux[2] % 400 == 0)) {
			if ((fechaAux[0] > 0 && fechaAux[0] <= 29)) {
				esCorrecta = true;
			}
		}
		else {
			if (fechaAux[0] > 0 && fechaAux[0] <= 28) {
				esCorrecta = true;
			}
		}
	}	

	//comprueba que el més sea correcto.
	if (!((fechaAux[1] > 0 && fechaAux[1] <= 12) &&
					fechaAux[1].length === 2 && esCorrecta)) {
		esCorrecta = false;
	}	

	//Comprueba que el año sea crrecto.
	if (!(fechaAux[2].length === 4 && esCorrecta)) {
		esCorrecta = false;
	}	
	return esCorrecta;
}

function pedirFecha() {

	while (!continuar) {

		duracion = prompt('Fecha de expiración (formato: dd/mm/aaaa):');	

		if (getRegexFecha().test(duracion)) {	

			if (esFechaValida(duracion)) {					

				fechaArray = duracion.split('/');	

				if (esFechaPosteriorActual(fechaArray)) {
					continuar = true;
				}
				else {
					alert('La fecha tiene que ser posterior a la actual...')
				}
			}
			else {
				alert('Fecha erronea...');
			}
		}
		else {
			alert('Error de formato...');
		}
	}		

	let date = new Date();	
	date.setDate(parseInt(fechaArray[0]));
	date.setMonth(parseInt(fechaArray[1]-1));
	date.setFullYear(parseInt(fechaArray[2]));
	date.setHours(01);
	date.setMinutes(00);
	date.setSeconds(00);	

	return date;
}

function esFechaPosteriorActual(fecha) {

	let anyo = parseInt(fecha[2]);
	let mes = parseInt(fecha[1]-1);
	let dia = parseInt(fecha[0]);
	let fechaAux = new Date(anyo, mes, dia);

	if (fechaAux.getTime() < new Date().getTime()) {
		return false;
	}
	else {
		return true;
	}
}

function existeCookie(nombreCookie) {

	var cookies = document.cookie;	

	if (cookies.length > 0) {	

		let arrayCookies = cookies.split(';');	

		for (let i=0; i<arrayCookies.length; i++) {	

			let nombre = arrayCookies[i].split('=');
			console.log("nombreDeCookie: " + nombre[0] +
									"  NombreParametro: " + nombreCookie);
									
			if (nombreCookie  == nombre[0].trim()) {
				return true;
			}
		}
		return false;
	} 
}
