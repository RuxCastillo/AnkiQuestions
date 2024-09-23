const sidebar = document.getElementById('sidebar');
const sidebarbutton = document.querySelector('.fa-bars');
const nextQuestionButton = document.querySelector('.app__next');
const answerButton = document.querySelector('.app__answer');
const answerOfQuestion = document.querySelector('.answer');
const questionText = document.querySelector('.app__question');

import activandoCategorias from './script/categories.js';

sidebarbutton.addEventListener('click', () => {
	sidebar.classList.toggle('hide');
});

activandoCategorias();

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
