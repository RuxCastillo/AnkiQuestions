import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import env from 'dotenv';
import pg from 'pg';
import postgreRoutes from './postgresql.js';

env.config();

const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, '../views')));
//app.set('view engine', 'html');

const contraseña = process.env.CONTRA;

const db = new pg.Client({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DATABASE,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
	connectionTimeoutMillis: 20000,
	idleTimeoutMillis: 30000,
	max: 10,
	ssl: {
		rejectUnauthorized: false,
	},
});

db.connect().catch((err) =>
	console.error('Error de node a la base de datos', err)
);

app.get('/', (req, res) => {
	res.sendFile('landing page.html', {
		root: path.join(__dirname, '../views'),
	});
});

app.get('/app', (req, res) => {
	res.sendFile('app.html', {
		root: path.join(__dirname, '../views'),
	});
});

app.get('/obteniendoPregunta', async (req, res) => {
	try {
		const buscandoCategoria = req.query.categoria;
		if (!buscandoCategoria) {
			return res
				.status(400)
				.send('Falta el parametro de la categoria para enviarla');
		}
		if (buscandoCategoria === 'All') {
			let result = await db.query(postgreRoutes.unaPreguntaRandomTodo);
			let response = result.rows[0];
			res.send(response);
		} else {
			let result = await db.query(postgreRoutes.unaPreguntaRandomCategoria, [
				buscandoCategoria,
			]);
			let response = result.rows[0];
			res.send(response);
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching obteniendo pregunta', error });
	}
});

app.post('/agregarPregunta', async (req, res) => {
	if (
		req.body.preguntacrear === '' ||
		req.body.respuestacrear === '' ||
		req.body.categoriacrear === ''
	) {
		return res
			.status(400)
			.send('Falta el parametro para agregar pregunta nueva');
	}
	console.log(req.body);
	const { preguntacrear, respuestacrear, categoriacrear } = req.body;
	try {
		const result = await db.query(postgreRoutes.crearPregunta, [
			preguntacrear,
			respuestacrear,
			categoriacrear,
		]);
		res.status(200).send({ respuesta: 'Pregunta creada en la base de datos.' });
	} catch (err) {
		return res
			.status(500)
			.send('Error al consultar la base de datos para agregar pregunta nueva');
	}
});

app.get('/crearoeditar', (req, res) => {
	res.render('editar pregunta');
});

app.get('/obteniendoinfoporidparaeditar', async (req, res) => {
	let elIdPreguntaAEditar = req.query.id;
	console.log(elIdPreguntaAEditar);
	if (!elIdPreguntaAEditar) {
		return res
			.status(400)
			.send(
				'Falta el parametro de categoria para pasar info de pregunta a editar'
			);
	}
	try {
		console.log('hola');
		let result = await db.query(postgreRoutes.obtenerUnaPreguntaPorId, [
			elIdPreguntaAEditar,
		]);
		console.log(result.rows);
		res.send(result.rows);
	} catch (err) {
		res
			.status(500)
			.send(
				'Error al pedir a base de datos una pregunta en especifico para editarla'
			);
	}
});

app.post('/updatepregunta', async (req, res) => {
	const lainfonueva = req.body;
	if (
		!lainfonueva ||
		lainfonueva.preguntaseditar === '' ||
		lainfonueva.respuestaeditar === '' ||
		lainfonueva.categoriaeditar === ''
	) {
		return res
			.status(400)
			.send('falta el parametro de la info nueva para editar la pregunta');
	}
	const { preguntaseditar, respuestaeditar, categoriaeditar, numId } =
		lainfonueva;
	try {
		const result = await db.query(postgreRoutes.editarUnaPregunta, [
			preguntaseditar,
			respuestaeditar,
			categoriaeditar,
			numId,
		]);
		if (result.rows.length === 0) {
			return res
				.status(404)
				.send('Pregunta no encontrada editandopregunta api');
		}
		res
			.status(200)
			.send({ respuesta: 'Pregunta actualizada en la base de datos.' });
	} catch (err) {
		res.status(500).send('Error interno al editar la pregunta');
	}
});

app.get('/solicitandocategorias', async (req, res) => {
	try {
		const result = await db.query(postgreRoutes.obtenerCategorias);
		res.send(result.rows);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching las categorias antes era home', error });
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

app.get('/preguntas', async (req, res) => {
	const htmlPreguntas = `
			<div class="app__question">Question Here</div>
			<div class="app__button">
				<button class="btn app__answer">See Answer</button>
				<div class="answer hide">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
					molestias consequuntur iusto tempora rem in iure dolor nam! Possimus,
					aliquam. Cumque excepturi, cupiditate officiis illum fuga earum
					quisquam numquam unde.
				</div>
				<button class="btn app__next">Next Question</button>
			</div>`;

	res.send(htmlPreguntas);
});

app.get('/creacion', async (req, res) => {
	const htmlCreacion = `			<form class="create">
				<h3>Create question</h3>

				<textarea
					name="preguntacrear"
					class="crearPregunta"
					placeholder="Write the question here..."
				></textarea>
				<textarea
					name="respuestacrear"
					class="crearRespuesta"
					placeholder="Write the answer here..."
				></textarea>
				<div>
				<label for="create-categories">Select category:</label>
				<select name="categoriacrear" id="create-categories" class="crearNuevaCategoria">
					<option value="">Choose the appropriate category</option>
				</select>
				</div>
				<button type="submit">Add question to database</button>
			</form>`;

	res.send(htmlCreacion);
});

app.get('/edit', async (req, res) => {
	const htmlEdit = `			<form class="editar">
				<div class="titulo">
					<h3>Edit questions</h3>
					<input type="number" class="editarNumId" />
					<button type="button" class="editarBuscarId">Buscar ID</button>
				</div>
				<div class="textareas">
					<textarea class="editarPregunta" id="lapregunta"></textarea>
					<textarea class="editarRespuesta"></textarea>
				</div>
				<div class="edit-categorie">
					<label for="edit-categories">Select category:</label>
					<select
						name="categoriacrear"
						id="edit-categories"
						class="editarNuevaCategoria"
					>
						<option value="">Choose the appropriate category</option>
					</select>
				</div>
				<button class="button-submit">Edit question</button>
			</form> `;
	res.send(htmlEdit);
});
