import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getAIEngine,
  getChallenges,
  completeChallenge,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/ai-engine', authMiddleware, getAIEngine);
router.get('/challenges', authMiddleware, getChallenges);
router.post('/complete-challenge', authMiddleware, completeChallenge);

export default router;
