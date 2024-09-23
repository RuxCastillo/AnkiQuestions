function activandoCategorias() {
	const currentCategory = document.querySelector('.current-category');
	listaDeCategorias();

	async function listaDeCategorias() {
		let response = await fetch('/solicitandocategorias');
		if (!response.ok) {
			throw new Error(`Error solicitando categorias: ${response.status}`);
		}
		let data = await response.json();
		poniendoCategorias(data);
	}

	async function poniendoCategorias(categorias) {
		let categoriasBar = document.querySelector('.categories');

		categorias.forEach((element) => {
			let btn = document.createElement('button');
			btn.innerText = element.categoria;
			categoriasBar.appendChild(btn);
		});

		activatingCategoryChanger();
	}

	function activatingCategoryChanger() {
		const allCategories = document.querySelectorAll('.categories button');

		allCategories.forEach((element) => {
			element.addEventListener('click', () => {
				currentCategory.innerText = element.innerText;
			});
		});
	}
}

export default activandoCategorias;
