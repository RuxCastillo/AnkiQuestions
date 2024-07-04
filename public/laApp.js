const serverData = document.querySelector("#serverData").innerText;
let otra = JSON.parse(serverData)

const categorias = document.querySelector(".categorias");

let save = "";
for(let variable of otra) {
    save += `<div class="cuadroCategoria" onclick="seleccionandoCategoria('${variable.categoria}')">${variable.categoria}</div>`
}

categorias.innerHTML += save;

function seleccionandoCategoria(clickCategoria) {
    document.querySelector(".categoriaActual h2").innerText = clickCategoria
}

    document.querySelector(".nuevaPregunta button").addEventListener("click", llamandoUnaPregunta) 

async function llamandoUnaPregunta() {
    console.log("llamandounapreguntafunction")
        let nombreCategoriaAEnviar = document.querySelector(".categoriaActual h2").innerText
        let soloUnaPregunta;

        const url = `/obteniendoPregunta?categoria=${nombreCategoriaAEnviar}`

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error llamandounapreguntafunction: ${response.statusText}`)
            }
            let data = await response.json();
            soloUnaPregunta = data;
            paseleSrPregunta(soloUnaPregunta)
        } catch(error) {
            console.error("Error: unapregunta", error)
        }
}

function paseleSrPregunta(todaLaCategoria) {
    console.log(todaLaCategoria)
    document.querySelector(".textoPregunta").innerText = todaLaCategoria.preguntas
    document.querySelector(".respuestaCorrecta textarea").value = todaLaCategoria.respuestas
    document.querySelector(".respuestaCorrecta textarea").style.display = "none"
    document.querySelector(".respuestas button").style.display = "block"
    document.querySelector(".respuestas button").addEventListener("click", revelarRespuesta)
    document.querySelector(".preguntaInfo .numeroId p").innerText = todaLaCategoria.id

}

function revelarRespuesta() {
    document.querySelector(".respuestaCorrecta textarea").style.display = "block"
    document.querySelector(".respuestas button").style.display = "none"
}

function clickABienoMal() {
    document.querySelector("")
}

// cada que le de a bien o mal tiene que aumentar en uno el contador correspondiente.
// tambien tiene que estar al pendiente a la variable elegida de cuantas preguntas queremos.
// si se escoge otro numero del numero de preguntas se tiene que reiniciar el marcador
// cuando el marcador llegue a la meta elegida tiene que salir un alert diciendote que ganaste o perdites y ahi reiniciamos el marcador.
// el marcador elegido lo quiero que cambie de background a amarillo ara mostrar cual es el correcto.
//display none de los cuadritos en crearoeditar page

let metaPreguntas = 10;
let contestadasBien = 0;
let contestadasMal = 0;
document.querySelector(".solo10").style.backgroundColor = "yellow";

function cambiandoMetaPreguntasConCuadrito(num) {
    console.log(num)
    console.log(document.querySelector(`.solo${num}`))
    document.querySelector(`.solo${metaPreguntas}`).style.backgroundColor = "white";
    contestadasMal = 0;
    document.querySelector(".contadorMal").innerText = 0;
    contestadasBien = 0;
    document.querySelector(".contadorBien").innerText = 0;
    document.querySelector(`.solo${num}`).style.backgroundColor = "yellow";
    metaPreguntas = num
}

function agregandoPuntos(resultado) {
    console.log(contestadasBien)
    let puntos = (resultado === "Bien")? contestadasBien++ : contestadasMal++
    console.log(contestadasBien)
    document.querySelector(".contador" + resultado).innerText = puntos+1;
    checarMeta()
}

function checarMeta() {
    if (metaPreguntas === contestadasBien) {
        alert(`Felicidades ganaste, estas mas cercas del trabajo. \nContestadas bien: ${contestadasBien}\nContestadas mal: ${contestadasMal}`)
        cambiandoMetaPreguntasConCuadrito(metaPreguntas)
    } else if (metaPreguntas === contestadasMal) {
        alert(`Perdiste pero sigue esforzandote :D. \nContestadas bien: ${contestadasBien}\nContestadas mal: ${contestadasMal}`)
        cambiandoMetaPreguntasConCuadrito(metaPreguntas)
    }
}