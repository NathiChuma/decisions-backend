import { Response } from 'express';
import { db } from '../../firebase';
import { AuthRequest } from '../../middleware/auth';
import { serializeDecision } from '../../utils/serializeDecision';

const getDecisions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const snapshot = await db
      .collection('decisions')
      .where('userId', '==', req.userId)
      .orderBy('createdAt', 'desc')
      .get();

    const decisions = snapshot.docs.map((doc) => serializeDecision(doc.data()));

    res.status(200).json({ decisions });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getDecisions;