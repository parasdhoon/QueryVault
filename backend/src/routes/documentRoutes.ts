import express from 'express';
import { getDocuments, addDocument, removeDocument } from '../controllers/documentController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();
router.use(authenticate);
router.get('/', getDocuments);
router.post('/', addDocument);
router.delete('/:id', removeDocument);

export default router;