import Resource from '../models/Resource.js';

export const getResources = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const resources = await Resource.find(query)
      .populate('createdBy', 'name avatar')
      .sort({ upvotes: -1 });

    res.json({ success: true, resources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addResource = async (req, res) => {
  try {
    const { title, description, category, url, tags, difficulty } = req.body;

    const resource = new Resource({
      title,
      description,
      category,
      url,
      tags,
      difficulty,
      createdBy: req.userId,
    });

    await resource.save();
    await resource.populate('createdBy', 'name avatar');

    res.json({ success: true, resource, message: 'Resource added!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveResource = async (req, res) => {
  try {
    const { resourceId } = req.body;
    const resource = await Resource.findByIdAndUpdate(
      resourceId,
      { $addToSet: { savedBy: req.userId } },
      { new: true }
    );

    res.json({ success: true, resource, message: 'Resource saved!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const upvoteResource = async (req, res) => {
  try {
    const { resourceId } = req.body;
    const resource = await Resource.findByIdAndUpdate(
      resourceId,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    res.json({ success: true, upvotes: resource.upvotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSavedResources = async (req, res) => {
  try {
    const resources = await Resource.find({ savedBy: req.userId });
    res.json({ success: true, resources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
