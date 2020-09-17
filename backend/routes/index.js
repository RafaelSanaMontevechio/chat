import express from 'express';

import { encode } from '../middlewares/jwt.js';

import user from '../controllers/user.js';

const router = express.Router();

router.post('/login', encode, user.onUserLogin);

export default router;
