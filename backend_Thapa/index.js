const express = require('express');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.status(200).send('<h1>This is nomi khan with backend</h1>');
});

app.listen(port, () => {
    console.log(`server is running at: ${port}`);
});
