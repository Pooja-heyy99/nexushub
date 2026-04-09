import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
  try {
    const { filter } = req.query;
    let query = {};
    
    if (filter === 'upcoming') {
      query.date = { $gte: new Date() };
    } else if (filter === 'past') {
      query.date = { $lt: new Date() };
    }

    const events = await Event.find(query)
      .populate('organizer', 'name avatar')
      .populate('attendees', 'name avatar')
      .sort({ date: 1 });
    
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name avatar bio')
      .populate('attendees', 'name avatar');
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, eventType, maxAttendees, tags, prizes } = req.body;
    
    const event = new Event({
      title,
      description,
      date,
      location,
      eventType,
      maxAttendees,
      tags,
      prizes,
      organizer: req.userId,
      attendees: [req.userId],
    });

    await event.save();
    await event.populate('organizer', 'name avatar');
    
    res.json({ success: true, event, message: 'Event created!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { attendees: req.userId } },
      { new: true }
    ).populate('attendees', 'name avatar');

    res.json({ success: true, event, message: 'Registered for event!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unregisterEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { attendees: req.userId } },
      { new: true }
    ).populate('attendees', 'name avatar');

    res.json({ success: true, event, message: 'Unregistered from event!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
