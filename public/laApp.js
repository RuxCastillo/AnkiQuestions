setTimeout(lasCategorias, 1000)

function seleccionandoCategoria(clickCategoria) {
    document.querySelector(".categoriaActual h2").innerText = clickCategoria
}

    document.querySelector(".nuevaPregunta button").addEventListener("click", llamandoUnaPregunta) 

function llamandoUnaPregunta() {
    let nombreCategoriaAEnviar = document.querySelector(".categoriaActual h2").innerText

    fetch(`/obteniendoPregunta?categoria=${nombreCategoriaAEnviar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error: llamandoUnaPregunta" + response.statusText)
            }
            return response.json();
        })
        .then(data => {
            paseleSrPregunta(data)
        })
        .catch(error => {
            console.error("Error: unapreguntacatch", error)
        })
}

function paseleSrPregunta(todaLaCategoria) {
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
    document.querySelector(".respuestaUsuario textarea").value = "";
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