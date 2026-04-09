import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    category: {
      type: String,
      enum: ['Web Dev', 'ML/AI', 'Mobile', 'DevOps', 'Data Science', 'Cloud'],
      required: true,
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    points: {
      type: Number,
      default: 100,
    },
    completedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Challenge = mongoose.model('Challenge', challengeSchema);
export default Challenge;
