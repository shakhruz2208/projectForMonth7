import { Router } from 'express';
import { getChecklist, addChecklistItem, toggleChecklistItem, deleteChecklistItem, clearChecklist } from '../controllers/checklistController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getChecklist);
router.post('/', authenticate, addChecklistItem);
router.put('/:id', authenticate, toggleChecklistItem);
router.delete('/:id', authenticate, deleteChecklistItem);
router.delete('/', authenticate, clearChecklist);

export default router;
