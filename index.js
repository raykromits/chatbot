
const PORT = process.env.PORT || 3000;


const express = require('express');

const app = express();

app.use(express.json());



app.get('/', (req, res) => {

    res.send('Hello, World!');

});