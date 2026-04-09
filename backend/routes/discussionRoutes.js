import express from 'express';
import {
  getDiscussions,
  getDiscussionById,
  createDiscussion,
  addReply,
  upvoteDiscussion,
  markAsSolved,
} from '../controllers/discussionController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDiscussions);
router.get('/:id', getDiscussionById);
router.post('/create', authMiddleware, createDiscussion);
router.post('/reply', authMiddleware, addReply);
router.post('/upvote', authMiddleware, upvoteDiscussion);
router.post('/solve', authMiddleware, markAsSolved);

export default router;
