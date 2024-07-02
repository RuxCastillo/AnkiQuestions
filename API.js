import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

env.config();

const app = express();
const port = process.env.API_URL || 4000;
let laCategoria;

const db = new pg.Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_URL,
});

db.connect();

let todoDataBase;
    db.query("SELECT * FROM todaslaspreguntas", (err, res) => {
        if(err) {
            console.error("Error executing query dameTodasLasPreguntasEnVariable", err.stack);
        } else {
            todoDataBase = res.rows;
        }
    })

let todasCategorias;
    db.query("SELECT DISTINCT categoria FROM todaslaspreguntas", (err, res) => {
        if(err) {
            console.error("Error executing query dameTodasLasCategoriasDiferentes", err.stack);
        } else {
            todasCategorias = res.rows;
        }
    })

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/todaDB", (req, res) => {
    console.log(todoDataBase);
})

app.get("/home", (req, res) => {
    console.log(todasCategorias);
    res.send(todasCategorias);
})

app.get("/unaPreguntaDeCategoriaEspecifica", (req, res) => {

    const buscandoCategoria = req.query.categoria 
    console.log(buscandoCategoria)
    if(!buscandoCategoria) {
        return res.status(400).send("Falta el parametro de categoria unaPreguntaDeCategoriaEspecifica");
    }

    const query = `SELECT id, preguntas, respuestas FROM todaslaspreguntas WHERE categoria = $1;`;
    db.query(query, [buscandoCategoria], (err, result) => {
        if(err) {
            console.error("Error ejecutando la consulta: unaPreguntaDecategoriaEspecifica", err);
            return res.status(500).send("Error en el servidor");
        }
        console.log(result.rows)
        res.send(result.rows);
    })
})

app.get("/preguntaporid", (req, res) => {

    const buscandoId = req.query.id 
    console.log(buscandoId)
    if(!buscandoId) {
        return res.status(400).send("Falta el parametro de categoria preguntaporid API");
    }

    const query = `SELECT preguntas, respuestas, categoria FROM todaslaspreguntas WHERE id = $1;`;
    db.query(query, [buscandoId], (err, result) => {
        if(err) {
            console.error("Error ejecutando la consulta: preguntaporid API", err);
            return res.status(500).send("Error en el servidor");
        }
        console.log(result.rows)
        res.send(result.rows);
    })
})

app.post("/editandopregunta", async (req, res) => {
    const laInfoNueva = req.body;
    let id = req.body.numId;
    let pregunta = req.body.preguntaseditar
    let respuesta = req.body.respuestaeditar
    let categoria = req.body.categoriaeditar
    console.log(id, pregunta, respuesta, categoria)
    if(!laInfoNueva) {
        return res.status(400).send("Falta el parametro de laInfo nueva editandopregunta api");
    }


    const query = `UPDATE todaslaspreguntas SET preguntas = $1, respuestas = $2, categoria = $3 WHERE id = $4 RETURNING *`
    db.query(query, [pregunta, respuesta, categoria, id], (err, result) => {
        if(err) {
            console.error("Error ejecutando editandopregunta api", err);
            return res.status(500).send("Error en api editandopregunta")
        }
        if(result.rows.length === 0) {
            return res.status(404).send("Pregunta no encontrada editandopregunta api");
        }
    res.json(result.rows[0]);
    console.log("pregunta actualizada")
    })
})

app.post("/agregarpreguntaapi", async (req, res) => {
    const lainfonueva = req.body;
    let pregunta = req.body.preguntacrear;
    let respuesta = req.body.respuestacrear;
    let categoria = req.body.categoriacrear;
    console.log(pregunta, respuesta, categoria)
    if(!lainfonueva) {
        return res.status(400).send("Falta el parametro de la infonueva agregarpreguntaapi api");
    }

    const query = `INSERT INTO todaslaspreguntas (preguntas, respuestas, categoria) VALUES ($1, $2, $3)`
    db.query(query, [pregunta, respuesta, categoria], (err, result) => {
        if(err) {
            console.error("error ejecutando agregarpreguntas api api", err);
            return res.status(500).send("Error en api agregarpreguntasapi")
        }
        res.json(result.rows[0])
        console.log("pregunta actualizada")
    })
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})



