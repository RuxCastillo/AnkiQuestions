const serverData = document.querySelector("#serverData").innerText;
let otra = JSON.parse(serverData)


let saveBarraLateral = "";
for(let variable of otra) {
    saveBarraLateral += `<div class="cuadroCategoria" onclick="seleccionandoCategoria('${variable.categoria}')">${variable.categoria}</div>`
}
const categorias = document.querySelector(".categorias");
categorias.innerHTML += saveBarraLateral;

let saveSelectHTML = "";
for(let variable of otra) {
    saveSelectHTML += `<option value='${variable.categoria}'>${variable.categoria}</option>`
}
const crearSelect = document.querySelector(".crearCategoriasYaExistentes").innerHTML = saveSelectHTML;
const editarSelect = document.querySelector(".editarCategoriaYaExistente").innerHTML = saveSelectHTML;





function seleccionandoCategoria(clickCategoria) {
    document.querySelector(".categoriaActual h2").innerText = clickCategoria
}

const buscarIdButton = document.querySelector(".editarBuscarId").addEventListener("click", peticionBuscarPregunta);

async function peticionBuscarPregunta() {
    const idABuscar = document.querySelector(".editarNumId").value;
    console.log(idABuscar)
    let laRespuesta;

    const url = `http://localhost:3000/obteniendopreguntaparaeditar?id=${idABuscar}`

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Error peticionBuscarPregunta frontend: ${response.statusText}`)
        }
        let data = await response.json();
        laRespuesta = data;
        poniendoTodoTextoAEditar(laRespuesta)
    } catch(error) {
        console.error("Error: peticion buscar pregunta frontend", error)
    }

}

function poniendoTodoTextoAEditar(respuestaServer) {
    console.log(respuestaServer)
    document.querySelector(".editarPregunta").value = respuestaServer[0].preguntas
    document.querySelector(".editarRespuesta").value = respuestaServer[0].respuestas
    document.querySelector(".editarCategoriaYaExistente").value = respuestaServer[0].categoria
    document.querySelector(".editarNuevaCategoria").value = respuestaServer[0].categoria
}
