import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";
import axios from "axios";

env.config();

const app = express();
const port = process.env.PORT_SERVER || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const API_URL = process.env.API_URL || "http://localhost:4000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
        res.render("landing page")
})

app.get("/app", async (req,res) => {
        try {
                console.log(`${API_URL}/home`)
                const response = await axios.get(`${API_URL}/home`);
                console.log(response);
                res.render("laApp", { home: response.data });
        } catch (error) {
                res.status(500).json({ message: "Error fetching home", error});
        }
})

app.get("/unapregunta", async (req, res) => {
        let enviandoCategoriaAAPI = req.query.categoria
        try {
                console.log(`${API_URL}/unaPreguntaDeCategoriaEspecifica?categoria=${enviandoCategoriaAAPI}`)
                const response = await axios.get(`${API_URL}/unaPreguntaDeCategoriaEspecifica?categoria=${enviandoCategoriaAAPI}`)
                let numeroAleatorio = Math.floor(Math.random() * response.data.length);
                let preguntaAleatoria = response.data[numeroAleatorio]
                console.log(preguntaAleatoria)
                res.send(preguntaAleatoria)
        } catch (error) {
                res.status(500).json({ message: "Error fetching unaPreguntaDeCategoriaEspecifica", error})
        }
})

app.get("/editandopreguntaporid", async (req, res) => {
        try {
                const response = await axios.get(`${API_URL}/home`);
                res.render("editar pregunta", { home: response.data });
        } catch (error) {
                res.status(500).json({ message: "Error fetching home", error});
        }
})

app.get("/obteniendopreguntaparaeditar", async (req, res) => {
        let elIdPreguntaAEditar = req.query.id
        try {
                console.log(`${API_URL}/preguntaporid?id=${elIdPreguntaAEditar} hola`)
                const response = await axios.get(`${API_URL}/preguntaporid?id=${elIdPreguntaAEditar}`)
                const respuesta = response.data
                console.log(respuesta)
                res.send(respuesta)
        } catch (error) {
                res.status(500).json({ message: "Error fetching obteniendopreguntaparaeditar server", error})
        }
                
        
})

app.post("/informacioneditadapregunta", async (req, res) => {
        let todo = req.body;
                console.log(todo)
        try {
                console.log(`${API_URL}/editandopregunta`)
                const response =  await axios.post(`${API_URL}/editandopregunta`, req.body)
                const respuesta = response.data
                console.log(respuesta)
        } catch (error) {
                res.status(500).json({ message: "Error fetching obteniendopreguntaparaeditar server", error})
        }
                
})

app.post("/agregarpregunta", async (req, res) => {
        let todo = req.body;
        console.log(todo)
        try{
                console.log(`${API_URL}/agregarpreguntaapi`)
                const response = await axios.post(`${API_URL}/agregarpreguntaapi`, req.body)
                const respuesta = response.data
                console.log(respuesta)
        } catch (error) {
                res.status(500).json({message: "Error getching agregar pregunta server", error})
        }
})






app.listen(port, () => {
    console.log(`Server running on port ${port}`);

})

