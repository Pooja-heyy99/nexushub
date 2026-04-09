import express from 'express';
import {
  getTeamMatches,
  createTeam,
  getLeaderboard,
} from '../controllers/teamController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/matches', authMiddleware, getTeamMatches);
router.post('/create', authMiddleware, createTeam);
router.get('/leaderboard', getLeaderboard);

export default router;
