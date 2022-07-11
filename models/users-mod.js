const Thoughts = require('./thoughts-mod');
const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    username: {
        type: String,
        name: 'username',
        uniuque: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        name: 'email',
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid  address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
        required: true
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    },
);

UsersSchema.post('findOneAndDelete', async function (thoughts) {
    console.log('These are your thoughts: ' + thoughts)
    if (thoughts) {
        const data = await Thoughts.deleteMany({ _id: { $in: [thoughts.thoughts] } } );
        console.log('This is data: ' + data);
    }
});
UsersSchema.virtual('friendCount').get(function() {
    if (this.friends.length > 0) {
        return this.friends.length;
    } else {
        return 0;
    }
});

const Users = model('Users', UsersSchema);



module.exports = Users