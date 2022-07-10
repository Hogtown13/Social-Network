const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/date-format');





const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max: [280, 'Limit of 280 characters']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal),
        toJSON: true
    },
    

    
});


const ThoughtsSchema = new Schema(
    {
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
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reactions: [ReactionSchema],
    },
);


const Thoughts = model('Thoughts', ThoughtsSchema);


module.exports = Thoughts;
