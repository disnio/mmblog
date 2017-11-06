import * as tag from '../controller/tag';
import express from 'express';
const router = express.Router();

router.post('/', tag.createTag);
router.get('/', tag.getTags);
router.patch('/:id', tag.modifyTag);
router.delete('/:id', tag.deleteTag);

export default router;