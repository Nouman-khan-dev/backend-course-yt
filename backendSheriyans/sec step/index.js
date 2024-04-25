const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

app.get('/', (req, res) => {
    fs.readdir(`./files`, function (err, files) {
        console.log(files);
        res.render('index', { files: files });
        console.log(files)
    });
});

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,(err)=>{
        res.redirect('/')
 
        err && console.log("error while create fiel : ",err)
    })
});

app.listen(port, () => console.log('server is listeing on: ', port));
