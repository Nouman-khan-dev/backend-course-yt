import express, { Router } from 'express';
import connectDb from './utils/db.js';
import router from './router/auth.router.js';
const app = express();
const port = 3000;

app.use('/', router);
app.use('/auth', router);
app.use('/fb', router);

// app.get('/fb', (req, res) => {
//     res.status(200).send('<h1>This is nomi khan"s facebook</h1>');
// });

app.listen(port, () => {
    console.log('server is running at port ', port);
});

// connectDb()
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`server is running at: ${port}`);
//         });
//     })
//     .catch((error) => console.error('Failed to connect', error));
