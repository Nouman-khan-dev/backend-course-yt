// import { Express, Router } from 'express';
import express from 'express';
import {
    home,
    hello,
    auth,
    facebook,
} from '../controllers/auth-controller.js';
const app = express();
const router = express.Router();

router.get('/', home);

router.get('/hello', hello);

router.get('/auth', auth);
//
router.route('/fb').get(facebook);

export default router;
