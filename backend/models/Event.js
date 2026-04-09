import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  location: String,
  eventType: {
    type: String,
    enum: ['hackathon', 'workshop', 'meetup', 'webinar', 'competition'],
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  image: String,
  registrationStatus: {
    type: String,
    enum: ['open', 'closed', 'full'],
    default: 'open',
  },
  maxAttendees: Number,
  tags: [String],
  prizes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Event', eventSchema);
