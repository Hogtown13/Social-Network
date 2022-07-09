const { match } = require('assert');
const { Schema, model } = require('mongoose');
const Thoughts = require('./Thoughts');

const UsersSchema = new Schema({
    username: {
        type: String,
        uniuque: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Valid email address required',
        validate: [validateEmail, 'Please give a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }

)
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const Users = model('Users', UsersSchema);


module.exports = Users