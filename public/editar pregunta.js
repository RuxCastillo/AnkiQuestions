lasCategorias();

function seleccionandoCategoria(clickCategoria) {
    document.querySelector(".categoriaActual h2").innerText = clickCategoria
}

const buscarIdButton = document.querySelector(".editarBuscarId").addEventListener("click", peticionBuscarPregunta);

function peticionBuscarPregunta() {
    const idABuscar = document.querySelector(".editarNumId").value;

    fetch(`/obteniendoinfoporidparaeditar?id=${idABuscar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("primer then en peticionBuscarPregunta" + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            poniendoTodoTextoAEditar(data)
        })
        .catch(error => {
            console.error("llego al catch de peticionBuscarPregunta", error);
        })

}

function poniendoTodoTextoAEditar(respuestaServer) {
    console.log(respuestaServer)
    document.querySelector(".editarPregunta").value = respuestaServer[0].preguntas
    document.querySelector(".editarRespuesta").value = respuestaServer[0].respuestas
    document.querySelector(".editarCategoriaYaExistente").value = respuestaServer[0].categoria
    document.querySelector(".editarNuevaCategoria").value = respuestaServer[0].categoria
}

const submitEditarButton = document.querySelector(".segundoT").addEventListener("click", borrarCamposEditar);

function borrarCamposEditar() {
    console.log("le diste click a editar")
    document.querySelector(".editarNumId").value = "";
    document.querySelector(".editarPregunta").value = "";
    document.querySelector(".editarRespuesta").value = "";
    document.querySelector(".editarNuevaCategoria").value = "";
}

const submitCrearButton = document.querySelector(".primerT").addEventListener("click", borrarCamposCrear);

function borrarCamposCrear() {
    console.log("le diste click a crear")
    document.querySelector(".crearPregunta").value = ""    
    document.querySelector(".crearRespuesta").value = ""
    document.querySelector(".crearNuevaCategoria").value = ""
}

const selectCrear = document.querySelector(".crearCategoriasYaExistentes").addEventListener("change", crearPonerSelect);

function crearPonerSelect() {
    let actual = document.querySelector(".crearCategoriasYaExistentes").value;
    document.querySelector(".crearNuevaCategoria").value = actual;
}

const selectEdit = document.querySelector(".editarCategoriaYaExistente").addEventListener("change", editarPonerSelect);

function editarPonerSelect() {
    let actualedit = document.querySelector(".editarCategoriaYaExistente").value;
    document.querySelector(".editarNuevaCategoria").value = actualedit;
}

document.querySelector(".solo1").style.display = "none";
document.querySelector(".solo10").style.display = "none";
document.querySelector(".solo25").style.display = "none";
document.querySelector(".solo50").style.display = "none";

function lasCategoriasSelect() {

    console.log(lasCategoriasVariable)

    let saveSelectHTML = "";
    for(let variable of lasCategoriasVariable) {
        saveSelectHTML += `<option value='${variable.categoria}'>${variable.categoria}</option>`
    }
    const crearSelect = document.querySelector(".crearCategoriasYaExistentes").innerHTML = saveSelectHTML;
    const editarSelect = document.querySelector(".editarCategoriaYaExistente").innerHTML = saveSelectHTML;

}

setTimeout(lasCategoriasSelect, 1000)
