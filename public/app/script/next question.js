function nextQuestion() {
	const nextQuestionButton = document.querySelector('.app__next');
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
		const questionText = document.querySelector('.app__question');
		const answerOfQuestion = document.querySelector('.answer');
		questionText.innerText = question.preguntas;
		answerOfQuestion.innerText = question.respuestas;
	}
}

export default nextQuestion;
