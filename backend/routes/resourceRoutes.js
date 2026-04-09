import express from 'express';
import {
  getResources,
  addResource,
  saveResource,
  upvoteResource,
  getSavedResources,
} from '../controllers/resourceController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getResources);
router.post('/add', authMiddleware, addResource);
router.post('/save', authMiddleware, saveResource);
router.post('/upvote', authMiddleware, upvoteResource);
router.get('/saved', authMiddleware, getSavedResources);

export default router;
