const sidebar = document.getElementById('sidebar');
const sidebarbutton = document.querySelector('.fa-bars');
const answerButton = document.querySelector('.app__answer');
const answerOfQuestion = document.querySelector('.answer');

import nextQuestion from './script/next question.js';
import activandoCategorias from './script/categories.js';

nextQuestion();
activandoCategorias();

answerButton.addEventListener('click', answerToggle);
answerOfQuestion.addEventListener('click', answerToggle);

function answerToggle() {
	answerOfQuestion.classList.toggle('hide');
}

sidebarbutton.addEventListener('click', () => {
	sidebar.classList.toggle('hide');
});
