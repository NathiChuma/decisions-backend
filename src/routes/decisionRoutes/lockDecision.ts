import { Response } from 'express';
import { db } from '../../firebase';
import { AuthRequest } from '../../middleware/auth';
import { serializeDecision } from '../../utils/serializeDecision';

const lockDecision = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { chosenOptionId } = req.body as { chosenOptionId: string };

    if (!chosenOptionId) {
      res.status(400).json({ error: 'chosenOptionId is required' });
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

    if (existing?.lockedAt) {
      res.status(400).json({ error: 'Decision is already locked' });
      return;
    }

    const optionExists = (existing?.options ?? []).some(
      (option: { id: string }) => option.id === chosenOptionId
    );

    if (!optionExists) {
      res.status(400).json({ error: 'chosenOptionId does not match any option on this decision' });
      return;
    }

    await decisionRef.update({ chosenOptionId, lockedAt: new Date() });

    const updated = await decisionRef.get();
    res.status(200).json({ decision: serializeDecision(updated.data()!) });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default lockDecision;