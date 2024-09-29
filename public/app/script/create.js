export default function creacionPreguntas() {
	async function listaDeCategorias() {
		let response = await fetch('/solicitandocategorias');
		if (!response.ok) {
			throw new Error(`Error solicitando categorias: ${response.status}`);
		}
		let data = await response.json();
		poniendoCategorias(data);
	}
	async function poniendoCategorias(categorias) {
		let categoriasSelect = document.querySelector('#create-categories');

		categorias.forEach((element) => {
			categoriasSelect.innerHTML += `<option>${element.categoria}</option>`;
		});
	}
	listaDeCategorias();

	let btn = document.querySelector('form');
	btn.addEventListener('submit', (e) => {
		e.preventDefault();
		crearQuestion();
	});

	function crearQuestion() {
		const preguntaCrear = {
			preguntacrear: document.querySelector('.crearPregunta').value,
			respuestacrear: document.querySelector('.crearRespuesta').value,
			categoriacrear: document.querySelector('.crearNuevaCategoria').value,
		};
		console.log(preguntaCrear);
		fetch('/agregarPregunta', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(preguntaCrear),
		})
			.then((response) => response.json())
			.then((data) => {
				alert(data.respuesta);
				borrarCamposCrear();
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	function borrarCamposCrear() {
		document.querySelector('.crearPregunta').value = '';
		document.querySelector('.crearRespuesta').value = '';
	}
}
