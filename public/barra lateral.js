let lasCategoriasVariable = "hola";

function lasCategorias() {

    fetch("/solicitandocategorias")
        .then(response => {
            if(!response.ok) {
                throw new Error("solicitandocategorias primero" + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let save = "";
            for(let variable of data) {
                save += `<div class="cuadroCategoria" onclick="seleccionandoCategoria('${variable.categoria}')">${variable.categoria}</div>`
            }
            const categorias = document.querySelector(".categorias");
            categorias.innerHTML += save;
            lasCategoriasVariable = data
        })
        .catch(error => {
            console.error("llego al catch de solicitandocategorias", error);
        })
}
