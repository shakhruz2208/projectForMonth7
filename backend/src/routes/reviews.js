import { Router } from 'express';
import { getReviews, getReview, createReview, updateReview, deleteReview, markHelpful } from '../controllers/reviewController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', optionalAuth, getReviews);
router.get('/:id', optionalAuth, getReview);
router.post('/', authenticate, createReview);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);
router.post('/:id/helpful', optionalAuth, markHelpful);

export default router;
