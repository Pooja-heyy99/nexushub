import Team from '../models/Team.js';
import User from '../models/User.js';

export const getTeamMatches = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    // Find users with complementary skills
    const potentialMatches = await User.find({
      _id: { $ne: req.userId },
      team: null,
      skills: { $in: user.skills },
    }).limit(5);

    res.status(200).json({
      success: true,
      matches: potentialMatches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createTeam = async (req, res) => {
  try {
    const { name, description, memberIds } = req.body;

    const team = new Team({
      name,
      description,
      members: [req.userId, ...memberIds],
      leader: req.userId,
    });

    await team.save();

    // Update users' team
    await User.updateMany(
      { _id: { $in: [req.userId, ...memberIds] } },
      { team: team._id }
    );

    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ points: -1 })
      .limit(20)
      .select('name points rank avatar activity');

    res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
