const { Schema, model, Types } = require('mongoose');
const { stringify } = require('querystring');
const dateFormat = require('../utils/dateFormat');
const ObjectId = Schema.ObjectId;




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
        get: createdAtVal => dateFormat(createdAtVal)

    },
    toJSON: {
        getters: true
    },

    id: false
});


const ThoughtsSchema = new Schema({
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
        ref: User,
        required: true
    },
    reactions: {
        type: [reactionSchema]
    },
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,

});
ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;
