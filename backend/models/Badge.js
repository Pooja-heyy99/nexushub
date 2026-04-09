import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  icon: String,
  criteria: {
    type: String,
    enum: ['challenges_completed', 'streak', 'team_created', 'points_milestone'],
  },
  threshold: Number,
  awardedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Badge', badgeSchema);
