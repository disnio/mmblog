import * as user from '../controller/user';
import express from 'express';
const router = express.Router();

router.post('/', user.login);
router.post('/register', user.createUser);

export default router;