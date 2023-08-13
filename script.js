

const botones = document.getElementsByClassName('boton');
const imagenes = document.getElementsByTagName('img');
const btnStart = document.getElementById('start');
const pCronometro = document.getElementById('temporizador');
const pAciertos = document.getElementById('aciertos');
const resultado = document.getElementById('resultado');
const btnRestart = document.getElementById('restart');

let soundCheck = new Audio('./sounds/check.ogg');
let soundFondo = new Audio('./sounds/fondo.mp3');
let soundGood = new Audio('./sounds/good.flac');
let soundStart = new Audio('./sounds/start.ogg');
let soundVictory = new Audio('./sounds/victory.wav');
let soundWrong = new Audio('./sounds/wrong.flac');
let soundLose = new Audio('./sounds/lose.wav');

let valorUno=-1;
let valorDos=-1;
let val1="";
let val2="";
let id1=-1;
let id2=-1;
let comparacion;
let btnID =-1;
let aciertos = 0;
let intervalo;
let tiempo;
let arregloNumeros= ['1', '2', '3', '4', '5', '6' , '7' , '8', '9' , '10', '1', '2', '3', '4', '5', '6' , '7' , '8', '9' , '10'];

function recorrerCronometro(){

	let minutos= Math.trunc(tiempo/60);
	let segundos = tiempo%60;
	let addCeromin = "";
	if(minutos<10){
		addCeromin = "0"
	} else{
		addCeromin = ""
	}
	let addCeroseg = "";
	if(segundos<10){
		addCeroseg = "0"
	} else{
		addCeroseg = ""
	}
	pCronometro.innerHTML = 'Tiempo: '+ addCeromin + minutos + ":" + addCeroseg+  segundos;

	if(tiempo<0){
		clearInterval(intervalo)
		//sound.play();
	}
	
	comprobarDerrota();
	tiempo--;
}

function finDeJuego(){
	for(let i= 0;i<botones.length;i++){
		botones[i].setAttribute('disabled', '');
	}
	btnRestart.removeAttribute('hidden','');
	resultado.removeAttribute('hidden','');
	pCronometro.setAttribute('hidden','');
	pAciertos.setAttribute('hidden','');
}

function comprobarVictoria(){
	let vitoria = (botones.length/2) == aciertos;
	if(vitoria){
		//alert('gano');
		resultado.innerText = 'Victori-aah';
		clearInterval(intervalo);
		soundVictory.play();
		finDeJuego();
	}
}

function comprobarDerrota(){
	let derrota = tiempo <0;
	if (derrota) {
		pCronometro.innerHTML = 'Tiempo: 00:00';
		resultado.innerText= 'Derrot-aah';
		//alert('perdio');
		clearInterval(intervalo);
		soundLose.play();
		finDeJuego();
	}
}

function iniciarCronometro(){
	intervalo = setInterval(recorrerCronometro, 1000);
}

function comprobarValores(){
	if (val1==val2) {comparacion = true;}
	else{comparacion = false}
}

function shuffle(){
	let vectorAuxiliar = arregloNumeros;
	for (let i = vectorAuxiliar.length - 1; i > 0; i--) {
    	let j = Math.floor(Math.random() * (i + 1));
    	[vectorAuxiliar[i], vectorAuxiliar[j]] = [vectorAuxiliar[j], vectorAuxiliar[i]];
  	}
	return vectorAuxiliar;
}

function guardarId(id){
	if(id1==-1){
		id1 = id;
	} else if(id2 ==-1){
		id2 = id;
	} 
}

function guardarValor(valor){
	if(val1==""){
		val1 = valor;
	} else if(val2 ==""){
		val2 = valor;
	} 
}

function iniciarJuego(){
	arregloNumeros = shuffle();
	pCronometro.innerText = 'Tiempo: 01:30';
	tiempo = 89;
}

iniciarJuego();

for(let i = 0; i < botones.length; i++){
	botones[i].addEventListener('click', function(){
		soundCheck.play(); 
		const btn = document.getElementById(i);
		console.log(botones[i].name);
		btn.children[0].setAttribute('src', `img/${botones[i].name}.png`);
		btn.setAttribute('disabled','');
		guardarValor(botones[i].name);
		guardarId(i);

	let llenos = (val1!="" && val2!="")? true : false;
	if(llenos){
		comprobarValores();
		if(comparacion){
			soundGood.play();
			aciertos++;
			val1="";
			val2="";
			id1=-1;
			id2=-1;
			pAciertos.innerText = `Aciertos: ${aciertos}`
			comprobarVictoria();

		} else{
			soundWrong.play();
			let auxUno = id1;
			let auxDos = id2;
			id1=-1;
			id2=-1;
			val1="";
			val2="";
			setTimeout(function(){
			botones[auxUno].removeAttribute('disabled', '');
			botones[auxDos].removeAttribute('disabled', '');
			botones[auxUno].children[0].setAttribute('src', 'img/back.png');
			botones[auxDos].children[0].setAttribute('src', 'img/back.png');
			},500);
		}
	}
	})
	let ps = parseInt(botones[i].id);
	botones[i].setAttribute('name', arregloNumeros[ps]);
	botones[i].setAttribute('disabled', arregloNumeros[ps])
}

btnStart.addEventListener('click', function(){
	soundStart.play();
	resultado.innerText= '_______';
	btnStart.setAttribute('hidden','');
	pAciertos.removeAttribute('hidden','');
	pCronometro.removeAttribute('hidden','');
	for(let i= 0;i<botones.length;i++){
		botones[i].removeAttribute('disabled', '');
	}
	iniciarCronometro();
	})

btnRestart.addEventListener('click', function(){
	soundStart.play();
	btnRestart.setAttribute('hidden','');
	resultado.innerText= '_______';
	aciertos = 0;
	id1=-1;
	id2=-1;
	val1="";
	val2="";
	pAciertos.innerText = `Aciertos: ${aciertos}`
	pAciertos.removeAttribute('hidden','');
	pCronometro.removeAttribute('hidden','');
	iniciarJuego();
	for(let i= 0;i<botones.length;i++){
		let ps = parseInt(botones[i].id);
		botones[i].setAttribute('name', arregloNumeros[ps]);
		botones[i].children[0].setAttribute('src', 'img/back.png');
		botones[i].removeAttribute('disabled', '');
	}
	iniciarCronometro();
})