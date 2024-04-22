const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('Hi Backend');
});

app.listen(port, function () {
    console.log('the app is running on port', port);
});
