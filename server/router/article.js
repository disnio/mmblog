import express from 'express';
import * as art from '../controller/article';
// import confirmToken from '../middleware/confirmToken';
const router = express.Router();

router.get('/:id', art.getArticle);
router.get('/', art.getArticles);
router.post('/', art.createArticle);
router.patch('/:id', art.modifyArticle);
router.delete('/:id', art.deleteArticle)
export default router
