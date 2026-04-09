import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  registerEvent,
  unregisterEvent,
} from '../controllers/eventController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/create', authMiddleware, createEvent);
router.post('/register', authMiddleware, registerEvent);
router.post('/unregister', authMiddleware, unregisterEvent);

export default router;
