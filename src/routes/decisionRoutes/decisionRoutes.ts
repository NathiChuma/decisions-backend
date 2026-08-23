import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import createDecision from './createDecision';
import getDecisions from './getDecisions';
import getDecision from './getDecision';
import lockDecision from './lockDecision';
import completeDecision from './completeDecision';

const router = Router();

router.use(requireAuth);

router.post('/', createDecision);
router.get('/', getDecisions);
router.get('/:id', getDecision);
router.patch('/:id/lock', lockDecision);
router.patch('/:id/complete', completeDecision);

export default router;