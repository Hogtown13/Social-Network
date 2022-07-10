const { Users } = require('../models')

const usersController = {

    async getAllUsers(req, res) {
        try {
            const allUsers = await Users.find({});
            if (!allUsers.length) {
                res.status(400).json({ message: 'No users' });
                return;
            }
            res.json(allUsers);
        }
        catch (err) {
            res.json(err);
        }
    },

    async getUsersById({ params }, res) {
        try {
            const dbusersData = await Users.findOne({ _id: params.id })
                .populate('thoughts')
                .populate('friends')
                .select(['-__v', '-_id', '-email']);
            if (!dbusersData) {
                res.status(400).json({ message: 'no user with that id, please try another user id!' });
                return;
            }
            res.json(dbusersData);
        } catch (err) {
            res.json(err)
        }
    },

    async addUsers({ body }, res) {
        try {
            const createUsers = await Users.create(body);
            if (!createUsers) {
                res.status(400).json({ message: 'Create new user.' });
            }
            res.json(createUsers);
        } catch (err) {
            res.json(err);
        }
    },

    async updateUsers({ params, body }, res) {
        try {
            const dbusersData = await Users.findOneAndUpdate({ _id: params.id }, body, { new: true });
            res.json(dbusersData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUsers({ params }, res) {
        try {
            const dbusersData = await Users.findOneAndDelete({ _id: params.id }, { new: true });
            if (!dbusersData) {
                res.status(400).json({ message: 'Users ID not found!' });
            }
            res.json(dbusersData);
        }
        catch (err) {
            res.json(err);
        }
    },

    async addFriend({ params }, res) {
        try {
            const dbFriendData = await Users.findOne({ _id: params.usersId });
            const dbUsersData = await Users.findOneAndUpdate(
                { _id: params.usersId },
                { $push: { friends: dbFriendData._id } },
                { new: true }
            ).populate('friends');
            res.json(dbUsersData);
        }
        catch (err) {
            res.json(err);
        }
    },

    async deleteFriend({ params }, res) {
        try {
            const dbusersData = await Users.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: { $in: [params.friendId] } } },
                { new: true }
            ).populate('friends');
            await dbusersData.save();
            res.json(dbusersData);
        }
        catch (err) {
            res.json(err);
        }
    },
};

module.exports = usersController