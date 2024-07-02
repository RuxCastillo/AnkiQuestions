import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";

env.config();

const app = express();
const port = process.env.PORT;

const db = new pg.Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false,
    },
})

db.connect();

let todoDataBase;
    db.query("SELECT * FROM todaslaspreguntas", (err, res) => {
        if(err) {
            console.error("Error executing query para llenar todoDataBase variable", err.stack);
        } else {
            todoDataBase = res.rows;
        }
    })

let todasCategorias;
    db.query("SELECT DISTINCT categoria FROM todaslaspreguntas", (err, res) => {
        if(err) {
            console.error("Error executing query todasCategorias llenando variable", err.stack);
        } else {
            todasCategorias = res.rows;
        }
    })

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing page")
})

app.get("/app", (req, res) => {
    try {
        res.render("laApp", {home: todasCategorias});
    } catch (error) {
        res.status(500).json({ message: "Error fetching home", error});
    }
})

app.get("/obteniendoPregunta", async (req, res) => {
    try {
        const buscandoCategoria = req.query.categoria
        console.log(buscandoCategoria)
        if(!buscandoCategoria) {
            return res.status(400).send("Falta el parametro de la categoria para enviarla")
        }

        const query = `SELECT id, preguntas, respuestas FROM todaslaspreguntas WHERE categoria = $1;`;
        let result = await db.query(query, [buscandoCategoria]) 
        let response = result.rows
        let numeroAleatorio = Math.floor(Math.random() * response.length);
        let preguntaAleatoria = response[numeroAleatorio]
        console.log(preguntaAleatoria, "se llego hasta aqui")
        res.send(preguntaAleatoria);
    } catch (error) {
        res.status(500).json({ message: "Error fetching obteniendo pregunta", error});
    }
})

app.post("/agregarPregunta", async (req, res) => {
    let todo = req.body;
    let pregunta = req.body.preguntacrear;
    let respuesta = req.body.respuestacrear;
    let categoria = req.body.categoriacrear;
    if(!todo) {
        return res.status(400).send("Falta el parametro para agregar pregunta nueva");
    }

    try {
    const query = `INSERT INTO todaslaspreguntas (preguntas, respuestas, categoria) VALUES ($1, $2, $3);`
    const result = await db.query(query, [pregunta, respuesta, categoria]) 

       res.json(result.rows[0])
       console.log("fue agregada con exito a la base de datos la pregunta")
    } catch (err) {
        return res.status(500).send("Error al consultar la base de datos para agregar pregunta nueva")
    }
})

app.get("/crearoeditar", (req, res) => {
    try {
        res.render("editar pregunta", {home: todasCategorias});
    } catch (error) {
        res.status(500).json({ message: "Error fetching home para crear o editar pregunta", error});
    }
})

app.get("/obteniendoinfoporidparaeditar", async (req, res) => {
    let elIdPreguntaAEditar = req.query.id
    if(!elIdPreguntaAEditar) {
        return res.status(400).send("Falta el parametro de categoria para pasar info de pregunta a editar")
    }

    try {
        const query = `SELECT preguntas, respuestas, categoria FROM todaslaspreguntas WHERE id = $1;`;
        let result = await db.query(query, [buscandoId]) 

        res.send(result.rows)
    } catch (err) {
        res.status(500).send("Error al pedir a base de datos una pregunta en especifico para editarla")
    }
})

app.post("/updatepregunta", async (req, res) => {
    const lainfonueva = req.body;
    let pregunta = req.body.preguntaeditar
    let respuesta = req.body.respuestaeditar;
    let categoria = req.body.categoriaeditar;
    if(!lainfonueva) {
        return res.status(400).send("falta el parametro de la infor nueva para editar la pregunta")
    }

    try {
        const query = `UPDATE todaslaspreguntas SET preguntas = $1, respuestas = $2, categoria = $3 WHERE id = $4 RETURNING *`
        const result = await db.query(query, [pregunta, respuesta, categoria, id])

        if(result.rows.length === 0) {
            return res.status(404).send("Pregunta no encontrada editandopregunta api");
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send("Error interno al editar la pregunta")
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})