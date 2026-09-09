import { Router } from 'express';
import { getSavedTrips, saveTrip, removeTrip, clearTrips } from '../controllers/tripController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getSavedTrips);
router.post('/', authenticate, saveTrip);
router.delete('/:id', authenticate, removeTrip);
router.delete('/', authenticate, clearTrips);

export default router;
