let intentos = 6;
let palabra;

fetch('https://random-word-api.herokuapp.com/word?length=5&&lang=en')
    .then(response => response.json())
    .then(response =>{
        palabra = response[0].toUpperCase()
    })
    .catch(err => console.error(err));

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

const input = document.getElementById("guess-input");
const valor = input.value;

const ERROR = document.getElementById("error");

function intentar(){
    const INTENTO = leerIntento();
    if (INTENTO.length == 5){
        ERROR.style.display = 'none';
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';
        for (let i in palabra){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i]===palabra[i]){ //VERDE
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#79b851';
            } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#f3c237';
            } else {      //GRIS
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#a4aec4';
            }
            ROW.appendChild(SPAN)
        }
        GRID.appendChild(ROW)
        if (INTENTO === palabra ) {
            terminar("<h1>GANASTE!😀</h1>")
            return
        }
        intentos--;
        if (intentos==0){
            terminar("<h1>PERDISTE!😖</h1>")
        }
    }else{
        ERROR.style.display = 'block';
        input.value = '';
    }
}


function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
}


for (let i in palabra){
	console.log(palabra[i]);
}


function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}