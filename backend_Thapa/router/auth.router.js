// import { Express, Router } from 'express';
import express from 'express';
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('<h1>This is nomi khan with backend</h1>');
});

router.get('/auth', (req, res) => {
    res.status(200).send('<h1>This backend course </h1>');
});
//
router.route('/fb').get((req, res) => {
    res.status(200).send('<h1>This my facebook</h1>');
});

export default router;
