import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../firebase';
import { User } from '../../types';

const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const passwordMatch = await bcrypt.compare(password, userData['passwordHash'] as string);

    if (!passwordMatch) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const user: User = {
      id: userDoc.id,
      email: userData['email'],
      createdAt: userData['createdAt'],
    };

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default signin;