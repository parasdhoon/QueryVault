import { Request, Response } from 'express';
import prisma from '../db';

const verifyChatOwnership = async (chatId: number, userId: number) => {
    const chat = await prisma.chat.findFirst({
        where: {
            id: chatId,
            userId: userId
        }
    });

    return !!chat;
};

export const getDocuments = async (req: Request, res: Response) => {
    const chatId = parseInt(req.params.chatId);
    const userId = (req as any).userId;

    try {
        const ownsChat = await verifyChatOwnership(chatId, userId);
        if (!ownsChat) {
            return res.status(403).json({ error: 'Unauthorized access to chat' });
        }

        const documents = await prisma.document.findMany({
            where: { chatId },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
            }
        });

        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve documents', details: error });
    }
};

export const addDocument = async (req: Request, res: Response) => {
    const chatId = parseInt(req.params.chatId);
    const userId = (req as any).userId;
    const { title, content } = req.body;

    try {
        const ownsChat = await verifyChatOwnership(chatId, userId);
        if (!ownsChat) {
            return res.status(403).json({ error: 'Unauthorized access to chat' });
        }

        const newDocument = await prisma.document.create({
            data: {
                chatId,
                title,
                content,
            }
        });

        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add document', details: error });
    }
};

export const removeDocument = async (req: Request, res: Response) => {
    const documentId = parseInt(req.params.documentId);
    const userId = (req as any).userId;

    try {
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            select: { chatId: true }
        });

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const ownsChat = await verifyChatOwnership(document.chatId, userId);
        if (!ownsChat) {
            return res.status(403).json({ error: 'Unauthorized access to chat' });
        }

        await prisma.document.delete({
            where: { id: documentId }
        });

        res.status(200).json({ message: 'Document removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove document', details: error });
    }
};