export default editarPregunta() {
	async function listaDeCategorias() {
		let response = await fetch('/solicitandocategorias');
		if (!response.ok) {
			throw new Error(`Error solicitando categorias: ${response.status}`);
		}
		let data = await response.json();
		poniendoCategorias(data);
	}
	async function poniendoCategorias(categorias) {
		let categoriasSelect = document.querySelector('#edit-categories');

		categorias.forEach((element) => {
			categoriasSelect.innerHTML += `<option>${element.categoria}</option>`;
		});
	}
	listaDeCategorias();

	let btn = document.querySelector('form');
	btn.addEventListener('submit', (e) => {
		e.preventDefault();
		updateAQuestion()
	});


    function updateAQuestion() {
	const objetoAEnviar = {
		preguntaseditar: document.querySelector('#lapregunta').value,
		respuestaeditar: document.querySelector('.editarRespuesta').value,
		categoriaeditar: document.querySelector('.editarNuevaCategoria').value,
		numId: document.querySelector('.editarNumId').value,
	};
	fetch('/updatepregunta', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(objetoAEnviar),
	})
		.then((response) => response.json())
		.then((data) => {
			alert(data.respuesta);
			borrarCamposEditar();
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

function borrarCamposEditar() {
	document.querySelector('.editarNumId').value = '';
	document.querySelector('.editarPregunta').value = '';
	document.querySelector('.editarRespuesta').value = '';
}
const buscarIdButton = document
	.querySelector('.editarBuscarId')
	.addEventListener('click', peticionBuscarPregunta);

function peticionBuscarPregunta() {
	const idABuscar = document.querySelector('.editarNumId').value;
	fetch(`/obteniendoinfoporidparaeditar?id=${idABuscar}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					'primer then en peticionBuscarPregunta' + response.statusText
				);
			}
			return response.json();
		})
		.then((data) => {
			poniendoTodoTextoAEditar(data);
		})
		.catch((error) => {
			console.error('llego al catch de peticionBuscarPregunta', error);
		});
}

function poniendoTodoTextoAEditar(respuestaServer) {
	document.querySelector('.editarPregunta').value =
		respuestaServer[0].preguntas;
	document.querySelector('.editarRespuesta').value =
		respuestaServer[0].respuestas;
	document.querySelector('.editarCategoriaYaExistente').value =
		respuestaServer[0].categoria;
	document.querySelector('.editarNuevaCategoria').value =
		respuestaServer[0].categoria;
}
}