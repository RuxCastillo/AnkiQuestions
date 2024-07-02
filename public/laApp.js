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

function nuevaPreguntaBoton() {
    document.querySelector(".nuevaPregunta button").addEventListener("click", llamandoUnaPregunta) 
    console.log("presionaste nueva pregunta")
}

async function llamandoUnaPregunta() {
        let nombreCategoriaAEnviar = document.querySelector(".categoriaActual h2").innerText
        let soloUnaPregunta;

        const url = `http://localhost:3000/unapregunta?categoria=${nombreCategoriaAEnviar}`

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
