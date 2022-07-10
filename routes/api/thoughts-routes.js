

const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    addThoughts,
    updateThoughts,
    addReaction,
    removeThoughts,
    removeReaction
}
    = require('../../controllers/thoughts-con');

router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:usersId')
    .post(addThoughts);

router
    .route('/:thoughtsId')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(removeThoughts);

router
    .route('/reaction/:thoughsId')
    .post(addReaction);

router
    .route('/reaction/:thoughtsId/:reactionId')
    .delete(removeReaction);


module.exports = router;