import express from 'express';
import {
  getBadges,
  getUserBadges,
  awardBadge,
  createBadge,
} from '../controllers/badgeController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBadges);
router.get('/user', authMiddleware, getUserBadges);
router.post('/award', authMiddleware, awardBadge);
router.post('/create', authMiddleware, createBadge);

export default router;
