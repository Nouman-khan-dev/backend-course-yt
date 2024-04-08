import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello express');
});

app.get('/blog/:slug', (req, res) => {
    res.send(`hello ${req.params.slug}`);
    console.log(`hello ${req.params}`);
    console.log(`hello ${req.query}`);
});

app.listen(port, () => {
    console.log('app listening on port', port);
});
