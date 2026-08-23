import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../firebase';
import { User } from '../../types';

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const existingUser = await db.collection('users').where('email', '==', email).get();

    if (!existingUser.empty) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const userRef = db.collection('users').doc();

    const createdAt = new Date();

    const newUser: User = {
      id: userRef.id,
      email,
      createdAt,
    };

    await userRef.set({ email, passwordHash, createdAt });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      token,
    });

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default signup;