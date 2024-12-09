const express = require('express');
const cors = require('cors');
require("dotenv").config();
app = express();
const PORT = process.env.PORT || 4001;

app.get('/', (req, res) => {
    res.send("hola mundo");
});

app.listen(PORT, () => {
    console.log("Servidor iniciado en localhost");
});