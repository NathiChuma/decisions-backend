import { Response } from 'express';
import { db } from '../../firebase';
import { DecisionOption } from '../../types';
import { AuthRequest } from '../../middleware/auth';
import { serializeDecision } from '../../utils/serializeDecision';

const createDecision = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, context, confidence, options } = req.body as {
      title: string;
      context?: string;
      confidence: number;
      options: DecisionOption[];
    };

    if (!title || !title.trim()) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    if (!confidence || confidence < 1 || confidence > 5) {
      res.status(400).json({ error: 'Confidence must be between 1 and 5' });
      return;
    }

    if (!options || options.length < 2 || options.length > 4) {
      res.status(400).json({ error: 'Decision must have between 2 and 4 options' });
      return;
    }

    const decisionRef = db.collection('decisions').doc();
    const createdAt = new Date();

    const decisionData: Record<string, unknown> = {
      id: decisionRef.id,
      userId: req.userId,
      title,
      confidence,
      options,
      createdAt,
    };
    if (context) decisionData.context = context;

    await decisionRef.set(decisionData);

    res.status(201).json({ decision: serializeDecision(decisionData) });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default createDecision;