import { Response } from 'express';
import { db } from '../../firebase';
import { AuthRequest } from '../../middleware/auth';
import { serializeDecision } from '../../utils/serializeDecision';


const VALID_OUTCOMES = ['good', 'neutral', 'bad'];

const completeDecision = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { outcome, reflection } = req.body as { outcome: string; reflection?: string };

    if (!VALID_OUTCOMES.includes(outcome)) {
      res.status(400).json({ error: 'outcome must be one of good, neutral, bad' });
      return;
    }

    const decisionRef = db.collection('decisions').doc(id);
    const doc = await decisionRef.get();

    if (!doc.exists) {
      res.status(404).json({ error: 'Decision not found' });
      return;
    }

    const existing = doc.data();

    if (existing?.userId !== req.userId) {
      res.status(403).json({ error: 'Not authorized to modify this decision' });
      return;
    }

    if (!existing?.lockedAt) {
      res.status(400).json({ error: 'Decision must be locked before it can be completed' });
      return;
    }

    const updateData: Record<string, unknown> = { outcome, completedAt: new Date() };
    if (reflection) updateData.reflection = reflection;

    await decisionRef.update(updateData);

    const updated = await decisionRef.get();
    res.status(200).json({ decision: serializeDecision(updated.data()!) });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default completeDecision;