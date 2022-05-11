require("dotenv").config();
require('express-async-errors')
const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth");
const livrosRouter = require("./routes/livros");
const myLivrosRouter = require("./routes/myLivros")


const app = express();

app.use(cors())
app.set('trust proxy', true)
app.use(express.json());

app.use("/auth", authRouter);

app.use("/livros", livrosRouter);
app.use("/my/livros", myLivrosRouter)


app.use((error, request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    return response.json({
        status: "Error",
        message: error.message,  
    })
})

module.exports = app;
