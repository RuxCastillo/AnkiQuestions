function endPointToInnerHTML(section) {
	async function fetchNormal(str) {
		let response = await fetch(str);
		if (!response.ok) {
			throw new Error('Error al solicitar una seccion', str);
		}
		let data = await response.text();
		poniendoSeccion(data);
	}

	function poniendoSeccion(str) {
		app.innerHTML = '';
		app.innerHTML = str;
	}
	fetchNormal(section);

	let categoriaDesaparecer = document.querySelector('.current-category');
	if (section === '/preguntas') {
		categoriaDesaparecer.style.display = 'block';
	} else {
		categoriaDesaparecer.style.display = 'none';
	}
}

export default endPointToInnerHTML;
