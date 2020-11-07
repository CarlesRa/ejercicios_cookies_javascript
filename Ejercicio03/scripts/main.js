
var continuar;
var nombre;
var valor;
var duracion;
var fechaArray;

function anyadir() {

	let numRegistros;
	
	continuar = false;

	while (!continuar) {

		numRegistros = 
			prompt('Introduce el némero de registros que desea crear');
		
		if (Number.isInteger(parseInt(numRegistros))) {
			continuar = true;
		}
	}

	for (let i=1; i<=numRegistros; i++) {

		continuar = false;

		while (!continuar) {
			nombre = prompt('Nombre de la cookie ' + i + ':');
			if (nombre != '' && nombre != null) {
				continuar = true;
			}
		}
	
		continuar = false; 
	
		while (!continuar) {
			valor = prompt('Valor de la cookie' + i + ':');
			if (valor != '' && valor != null) {
				continuar = true;
			}
		}
		
		continuar = false; 
	
		if (duracion = pedirFecha()) {
			let date = new Date();
	
			date.setDate(parseInt(fechaArray[0]));
			date.setMonth(parseInt(fechaArray[1]-1));
			date.setFullYear(parseInt(fechaArray[2]));
			date.setHours(01);
			date.setMinutes(00);
			date.setSeconds(00);
		
			document.cookie = nombre + "=" + valor +
				";SameSite=Lax;expires=" + date.toUTCString();
	
			consultar();
		}
	}
	
}

	
	
function consultar() {

	let fila;
	let contenido;
	let div = document.getElementById('lista');
		
	//Compruebo si tiene hijos y los elimino
	//Para que no salgan varias listas.
	if (div.childElementCount > 0) {
		div.innerHTML = '';
	}
	
	let strCookies = document.cookie;
	let arrCookies = strCookies.split(';'); 

	if (arrCookies[0] != "") {

		let titulo = document.createElement('h2');
		let lista = document.createElement('ol');
		div.appendChild(titulo);
		titulo.innerHTML = 'Lista de cookies';

		arrCookies.forEach(cookie => {
			contenido = document.createTextNode(cookie);
			fila = document.createElement('li');
			fila.appendChild(contenido);
			lista.appendChild(fila);
			div.appendChild(lista);
		});
	}
	else {
		alert('No hay cookies que mostrar...')
	}
}
	
function modificar() {

	var cookieName = '';
	var cookieValue = '';
	var cookieExpires = '';
	continuar = false;

	while (!continuar) {
		cookieName = prompt('Introduce el nombre de la cookie');
		if (cookieName.length <= 0 ) {
			alert('Tiene que introducir un nombre');
		}
		else {
			continuar = true;
		}
	}
	console.log(existeCookie(cookieName));
	if (!existeCookie(cookieName)) {
		alert('El nombre introducido no pertenece a ninguna cookie');
	}
	else {
		continuar = false;
		while (!continuar) {
			cookieValue = prompt('Introduce el valor a almacenar');
			if (cookieValue.length <= 0) {
				alert('Tiene que introducir un valor');
			}
			else {
				if (cookieExpires = pedirFecha()) {
					document.cookie = cookieName + '=' + cookieValue +
						";SameSite=Lax;expires=" + cookieExpires.toUTCString();
					consultar();
					continuar = true;
				}
				
			}
		}
	}
}
	
function borrar() {
	continuar = false;

	var name;
	while (!continuar) {
		name = prompt('Nombre de la cooki a borrar:');

		if (name.length <= 0) {
			alert('Debe introducir un nombre...');
		}
		else {
			continuar = true;
		}
	}
	if (existeCookie(name)) {
		let expire = new Date();
		expire.setTime((expire.getTime() - 3600));
		document.cookie = name + "=; expires=" + expire;
		consultar();
	}
	else {
		alert('No existe ninguna cookie con ese nombre');
	}
}

function borrarTodo() {

	let cookies = document.cookie;

	let cookiesArray = cookies.split(';');

	cookiesArray.forEach(value => {

		let name = value.split('=')[0].trim();
		let expire = new Date();

		expire.setTime((expire.getTime() - 3600));
		document.cookie = name + "=; expires=" + expire;
	});
	
	consultar();
}