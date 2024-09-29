const sidebar = document.getElementById('sidebar');
const sidebarbutton = document.querySelector('.fa-bars');
const app = document.querySelector('#app');
const casa = document.querySelector('.fa-house');
let answerButton = document.querySelector('.app__answer');
let answerOfQuestion = document.querySelector('.answer');
const hojaPapel = document.querySelector('.fa-file');
const lapiz = document.querySelector('.fa-pen');

import nextQuestion from './script/next question.js';
import activandoCategorias from './script/categories.js';
import endPointToInnerHTML from './script/fetch.js';
import creacionPreguntas from './script/create.js';
import editarPregunta from './script/edit.js';

activandoCategorias();

function answerToggle() {
	answerOfQuestion.classList.toggle('hide');
}

sidebarbutton.addEventListener('click', () => {
	sidebar.classList.toggle('hide');
});

casa.addEventListener('click', () => {
	endPointToInnerHTML('/preguntas');
	setTimeout(() => {
		nextQuestion();
		answerButton = document.querySelector('.app__answer');
		answerOfQuestion = document.querySelector('.answer');
		answerButton.addEventListener('click', answerToggle);
		answerOfQuestion.addEventListener('click', answerToggle);
	}, 500);
});

hojaPapel.addEventListener('click', () => {
	endPointToInnerHTML('/creacion');
	setTimeout(() => {
		creacionPreguntas();
	}, 500);
});

lapiz.addEventListener('click', () => {
	endPointToInnerHTML('/edit');
	setTimeout(() => {
		editarPregunta();
	}, 500);
});
