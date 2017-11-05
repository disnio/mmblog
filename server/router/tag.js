import * as tag from '../controller/tag';
import express from 'express';
const router = express.Router();

router.post('/tags', tag.createTag);
router.get('/tags', tag.getTags);
router.patch('/tags/:id', tag.modifyTag);
router.delete('/tags/:id', tag.deleteTag);

export default router;