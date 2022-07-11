const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
}
    = require('../../controllers/users-con');

router
    .route('/')
    .post(createUsers)
    .get(getAllUsers)
    

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
