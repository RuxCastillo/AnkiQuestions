const postgreRoutes = {
	unaPreguntaRandomTodo: `SELECT id, preguntas, respuestas FROM todaslaspreguntas ORDER BY RANDOM() LIMIT 1;`,
	unaPreguntaRandomCategoria: `SELECT id, preguntas, respuestas FROM todaslaspreguntas WHERE categoria = $1 ORDER BY RANDOM() LIMIT 1;`,
	crearPregunta: `INSERT INTO todaslaspreguntas (preguntas, respuestas, categoria) VALUES ($1, $2, $3);`,
	obtenerUnaPreguntaPorId: `SELECT preguntas, respuestas, categoria FROM todaslaspreguntas WHERE id = $1;`,
	editarUnaPregunta: `UPDATE todaslaspreguntas SET preguntas = $1, respuestas = $2, categoria = $3 WHERE id = $4 RETURNING *`,
	obtenerCategorias: `SELECT DISTINCT categoria FROM todaslaspreguntas ORDER BY categoria;`,
};

export default postgreRoutes;
