const { Schema, model, Types } = require('mongoose');
const { stringify } = require('querystring');
const dateFormat = require('../utils/dateFormat');




const Thoughts = new Schema({
  thoughtText: {
      type: String,
      required: true,
      min: [1, 'Must include 1 character'],
      max: [280, 'Limit of 280 characters']
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
      type: String,
      required: true
  },
  reactions: {
     type: [reactionSchema]
  }

});


module.exports = Thoughts;
