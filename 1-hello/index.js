require('dotenv').config();
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/facebook', (req, res) => {
    res.send('Nouman Khan');
});
app.get('/login', (req, res) => {
    res.send('<h1>Please Login in to nomi.com</h1>');
});
app.get('/youtube', (req, res) => {
    res.send('<h2>Nomi official </h2>');
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`);
});
