import { Response } from 'express';
import { db } from '../../firebase';
import { AuthRequest } from '../../middleware/auth';
import { serializeDecision } from '../../utils/serializeDecision';

const getDecision = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const doc = await db.collection('decisions').doc(id).get();

    if (!doc.exists) {
      res.status(404).json({ error: 'Decision not found' });
      return;
    }

    const decision = doc.data();

    if (decision?.userId !== req.userId) {
      res.status(403).json({ error: 'Not authorized to view this decision' });
      return;
    }

    res.status(200).json({ decision: serializeDecision(decision!)});
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getDecision;