const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    addUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
}
    = require('../../controllers/users-con');

router
    .route('/')
    .get(getAllUsers)
    .post(addUsers)

router
    .route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers)

router
    .route('/:usersId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;
