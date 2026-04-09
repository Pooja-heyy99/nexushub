import User from '../models/User.js';
import Challenge from '../models/Challenge.js';
import { callAIEngine } from '../config/groq.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('challenges')
      .populate('team');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, skills, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        ...(name && { name }),
        ...(bio && { bio }),
        ...(skills && { skills }),
        ...(avatar && { avatar }),
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAIEngine = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const aiResponse = await callAIEngine(user);

    res.status(200).json({
      success: true,
      ...aiResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChallenges = async (req, res) => {
  try {
    const { category, difficulty } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const challenges = await Challenge.find(filter).limit(10);

    res.status(200).json({
      success: true,
      challenges,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const completeChallenge = async (req, res) => {
  try {
    const { challengeId } = req.body;

    const user = await User.findById(req.userId);
    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found',
      });
    }

    // Add challenge to user's completed challenges
    if (!user.challenges.includes(challengeId)) {
      user.challenges.push(challengeId);
      user.points += challenge.points;
      user.activity += 1;

      // Update rank based on points
      if (user.points >= 500) user.rank = 'Advanced';
      if (user.points >= 1000) user.rank = 'Expert';

      await user.save();
    }

    // Add user to challenge's completedBy
    if (!challenge.completedBy.includes(req.userId)) {
      challenge.completedBy.push(req.userId);
      await challenge.save();
    }

    res.status(200).json({
      success: true,
      message: 'Challenge completed!',
      points: challenge.points,
      newTotal: user.points,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
