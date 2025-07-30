import express from 'express';
import { getChats, createChat, deleteChat, getChatById, updateChat } from '../controllers/chatController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();
router.use(authenticate);
router.get('/', getChats);
router.post('/', createChat);
router.get('/:chatId', getChatById);
router.put('/:chatId', updateChat);
router.delete('/:chatId', deleteChat);

export default router;