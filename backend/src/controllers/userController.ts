import { Request, Response } from 'express';
import prisma from '../db';
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/authMiddleware';

export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    const existingUser = await prisma.user.findUnique({where: { email }});
    if (existingUser) return res.status(400).json({ error: 'User already exisits' });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {email, passwordHash: hashedPassword}
        });

        res.status(201).json({ message: 'User created', userId: user.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user', details: error })
    }
};

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken(user.id);

    res.json({ token, userId: user.id });
};