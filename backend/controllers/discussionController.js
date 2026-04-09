import Discussion from '../models/Discussion.js';

export const getDiscussions = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const discussions = await Discussion.find(query)
      .populate('author', 'name avatar rank')
      .populate('replies.author', 'name avatar rank')
      .sort({ createdAt: -1 });

    res.json({ success: true, discussions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'name avatar rank bio')
      .populate('replies.author', 'name avatar rank');

    if (!discussion) {
      return res.status(404).json({ success: false, message: 'Discussion not found' });
    }

    res.json({ success: true, discussion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDiscussion = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const discussion = new Discussion({
      title,
      content,
      category,
      tags,
      author: req.userId,
    });

    await discussion.save();
    await discussion.populate('author', 'name avatar rank');

    res.json({ success: true, discussion, message: 'Discussion created!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addReply = async (req, res) => {
  try {
    const { discussionId, content } = req.body;

    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $push: {
          replies: {
            author: req.userId,
            content,
          },
        },
      },
      { new: true }
    )
      .populate('author', 'name avatar rank')
      .populate('replies.author', 'name avatar rank');

    res.json({ success: true, discussion, message: 'Reply added!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const upvoteDiscussion = async (req, res) => {
  try {
    const { discussionId } = req.body;
    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    res.json({ success: true, upvotes: discussion.upvotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAsSolved = async (req, res) => {
  try {
    const { discussionId } = req.body;
    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      { isSolved: true },
      { new: true }
    );

    res.json({ success: true, discussion, message: 'Marked as solved!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
