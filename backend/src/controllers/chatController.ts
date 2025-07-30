import { Request, Response } from "express";
import prisma from "../db";

export const getChats = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const chats = await prisma.chat.findMany({
            where: {userId},
            select: {
                id: true,
                title: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats', details: error });
    }
};

export const createChat = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const title = 'New Chat';

    try {
        const newChat = await prisma.chat.create({
            data: {
                title,
                userId,
            },
        });

        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create chat', details: error });
    }
};

export const deleteChat = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const chatId = parseInt(req.params.chatId);

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId, userId },
        });

        if (!chat || chat.userId !== userId) {
            return res.status(404).json({ error: 'Not Authorised to delete' });
        }

        await prisma.chat.delete({
            where: { id: chatId },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete chat', details: error });
    }
};

export const getChatById = async (req: Request, res: Response) => {
    const chatId = parseInt(req.params.chatId);
    const userId = (req as any).userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const chat = await prisma.chat.findFirst({
            where: {id: chatId, userId },
            include: {
                queries: true,
                documents: true,
            },
        });

        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chat', details: error });
    }
};

export const updateChat = async (req: Request, res: Response) => {
    const chatId = parseInt(req.params.chatId);
    const userId = (req as any).userId;
    const { title } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId, userId },
        });

        if (!chat || chat.userId !== userId) {
            return res.status(403).json({ error: 'Not authorize to update' });
        }

        const updatedChat = await prisma.chat.update({
            where: { id: chatId },
            data: { title },
        });

        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update chat', details: error });
    }
};