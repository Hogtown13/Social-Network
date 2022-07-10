const { Thoughts, Users } = require('../models');

const thoughtsController = {

  async getAllThoughts(req, res) {
    try {
      const allThoughts = await Thoughts.find({})

      if (!allThoughts.length) {
        res.json({ message: 'No thougths to share?' });
        return;
      }
      res.json(allThoughts);
    }
    catch (err) {
      res.json(err);
    }
  },

  async getThoughtsById({ params }, res) {
    try {
      const thoughtsData = await Thoughts.findOne({ _id: params.thoughtsId }
      )
        .populate('user');
      res.json(thoughtsData);
    }
    catch (err) {
      res.json(err);
    }
  },

  async addThoughts({ params, body }, res) {
    try {
      const addThoughts = await Thoughts.create(body);
      const usersData = await Users.findOneAndUpdate(
        { _id: params.usersId },
        { $push: { thoughts: addThoughts._id } },
        { new: true, runValidators: true }
      );
      addThoughts.users = usersData;
      await addThoughts.save();
      res.send(addThoughts);
    }
    catch (err) {
      res.json(err);
    }
  },

  async updateThoughts({ params, body }, res) {
    try {
      const thoughtsData = await Thoughts.findOneAndUpdate({ _id: params.thoughtsId }, body, { new: true });
      res.json(thoughtsData);
    }
    catch (err) {
      res.json(err);
    }
  },

  async addReaction({ params, body }, res) {
    try {

      const thoughtsData = await Thoughts.findOneAndUpdate(
        { _id: params.thoughtsId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
      res.json(thoughtsData);
    }
    catch (err) {
      res.json(err);
    }
  },


  async removeThoughts({ params }, res) {
    try {
      const thoughtsData = await Thoughts.findOneAndDelete(
        { _id: params.thoughtsId }
      )
      await thoughtsData.save();
      res.json(thoughtsData);
    }
    catch (err) {
      res.json(err);
    }
  },

  async removeReaction({ params }, res) {
    try {
      const thoughtsData = await Thoughts.findOneAndUpdate(
        { _id: params.thoughtsId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true, runValidators: true }
      )
      res.json(thoughtsData);
    }
    catch (err) {
      res.json(err);
    }
  },
};




module.exports = thoughtsController;


