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
        // console.log(files)
    });
});
app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("show",{filename:req.params.filename,filedata})
    })
   
});
app.get('/edit/:filename', (req, res) => {
        res.render("edit",{filename:req.params.filename})
});

app.post('/edit/:filename', (req, res) => {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`,(err)=>{
        res.redirect('/')
    })
});

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,(err)=>{
        res.redirect('/')
 
        err && console.log("error while create fiel : ",err)
    })
});

app.listen(port, () => console.log('server is listeing on: ', port));
