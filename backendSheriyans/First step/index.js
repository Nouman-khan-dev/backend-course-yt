const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/profile/:username', (req, res) => {
    req.params.username;
    res.send(
        `<h1>${req.params.username} Hello Wellcome to my Profile`
    );
});

app.listen(port, function () {
    console.log('the app is running on port', port);
});
