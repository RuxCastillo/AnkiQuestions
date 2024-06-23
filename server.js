import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
const port = process.env.SECRETLOCALPORT;
env.config();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})