import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

env.config();

const app = express();
const port = process.env.PORT_API;
let laCategoria;

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_DB,
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

function enviandoUnaPregunta() {
    let datosFiltrados = todoDataBase.filter((item) => {return (item.categoria === laCategoria)});
    let numRan = Math.floor(Math.random() * datosFiltrados.length);
    let resultado = datosFiltrados[numRan];
    console.log(datosFiltrados, numRan, resultado, laCategoria);
    return resultado;
}

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

app.post("/editandopregunta", (req, res) => {
    const laInfoNueva = req.body;
    console.log(laInfoNueva)
})







app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})



