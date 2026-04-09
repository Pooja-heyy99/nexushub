import Badge from '../models/Badge.js';
import User from '../models/User.js';

export const getBadges = async (req, res) => {
  try {
    const badges = await Badge.find().populate('awardedUsers', 'name avatar');
    res.json({ success: true, badges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserBadges = async (req, res) => {
  try {
    const userId = req.userId;
    const badges = await Badge.find({ awardedUsers: userId });
    res.json({ success: true, badges, count: badges.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const awardBadge = async (req, res) => {
  try {
    const { badgeId, userId } = req.body;
    const badge = await Badge.findByIdAndUpdate(
      badgeId,
      { $addToSet: { awardedUsers: userId } },
      { new: true }
    );
    res.json({ success: true, badge, message: 'Badge awarded!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBadge = async (req, res) => {
  try {
    const { name, description, icon, criteria, threshold } = req.body;
    const badge = new Badge({ name, description, icon, criteria, threshold });
    await badge.save();
    res.json({ success: true, badge, message: 'Badge created!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
