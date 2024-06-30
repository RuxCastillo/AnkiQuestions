import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";
import axios from "axios";

env.config();

const app = express();
const port = process.env.PORT_SERVER;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const API_URL = "http://localhost:4000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

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
                let numeroAleatorio = Math.floor(Math.random() * response.data.length) + 1;
                let preguntaAleatoria = response.data[numeroAleatorio]
                console.log(preguntaAleatoria)
                res.send(preguntaAleatoria)
        } catch (error) {
                res.status(500).json({ message: "Error fetching unaPreguntaDeCategoriaEspecifica", error})
        }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})