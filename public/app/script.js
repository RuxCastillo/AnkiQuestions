const sidebar = document.getElementById('sidebar');
const sidebarbutton = document.querySelector('.fa-bars');
const currentCategory = document.querySelector('.current-category');
const nextQuestionButton = document.querySelector('.app__next');
const answerButton = document.querySelector('.app__answer');
const answerOfQuestion = document.querySelector('.answer');
const questionText = document.querySelector('.app__question');

sidebarbutton.addEventListener('click', () => {
	sidebar.classList.toggle('hide');
});

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

nextQuestionButton.addEventListener('click', receivingNextQuestion);

async function receivingNextQuestion() {
	let current = document.querySelector('.current-category');
	let result = await fetch(
		`/obteniendoPregunta?categoria=${current.innerText}`
	);
	if (!result.ok) {
		throw new Error(`Error receiving the next question`);
	}
	let response = await result.json();

	puttingNextQuestion(response);
}

function puttingNextQuestion(question) {
	questionText.innerText = question.preguntas;
	answerOfQuestion.innerText = question.respuestas;
}

answerButton.addEventListener('click', answerToggle);
answerOfQuestion.addEventListener('click', answerToggle);

function answerToggle() {
	answerOfQuestion.classList.toggle('hide');
}
