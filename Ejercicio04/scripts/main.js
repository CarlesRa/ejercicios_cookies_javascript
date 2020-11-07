var preferences;
var expire = 'Sun, 07 Nov 2021 17:42:35 GMT'
var header = document.getElementById('head');
var section = document.getElementById('sect');
var menuSeleccion = document.getElementById('menu-seleccion');
var aside = document.getElementById('aside');
var footer = document.getElementById('footer');
var options = document.querySelectorAll('select');
var defaultColors = [
	'red', 'blue', 'green', 'gray'
];
var elementsArray = [
	header, section, aside, footer
];

preferences = document.cookie;

if (preferences.length <= 0 && preferences[0] != "") {
	
	setDefault();
	alert('**¡¡No se han encontrado preferencias de color'+
	 			'\nseleccione sus colores preferidos!!**');
}
else {
	setUserPrefs();
}

function setDefault() {
	for (let i=0; i<elementsArray.length; i++) {
		elementsArray[i].style.backgroundColor = defaultColors[i];
		options[i].value = defaultColors[i];
	}
}

function setUserPrefs() {

	let cookies = preferences.split(';');

	cookies.forEach(pref => {

		let prefsOptions = pref.split('=');

		setOptions(prefsOptions[0].trim(), prefsOptions[1].trim())
		
		switch (prefsOptions[0].trim()) {
			case 'header' :
				header.style.backgroundColor = prefsOptions[1].trim();
				break;
			case 'section' :
				section.style.backgroundColor = prefsOptions[1].trim();
				break;
			case 'aside' :
				aside.style.backgroundColor = prefsOptions[1].trim();
				break;
			case 'footer' :
				footer.style.backgroundColor = prefsOptions[1].trim();
				break;
		}
	});
}

function setOptions(option, value) {
	options.forEach(op => {
		if (op.name == option) {
			op.value = value;
		}
	});
}

function selectedHeaderColor(value) {
	console.log('header');
	header.style.backgroundColor = value.value;
	document.cookie = 'header=' + value.value + '; Secure; expires=' + expire; 
}

function selectedSectionColor(value) {
	section.style.backgroundColor = value.value;
	document.cookie = 'section=' + value.value + '; Secure; expires=' + expire; 
}

function selectedAsideColor(value) {
	aside.style.backgroundColor = value.value;
	document.cookie = 'aside=' + value.value + '; Secure; expires=' + expire; 
}

function selectedFooterColor(value) {
	footer.style.backgroundColor = value.value;
	document.cookie = 'footer=' + value.value + '; Secure; expires=' + expire; 
}