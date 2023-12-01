const router = require('express').Router();
const {
    getusers,
    getsingleuser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    delFriend,

} = require('../../controllers/usercontroller')

router.route('/').get(getusers).post(createUser)

router.route('/:userId').get(getsingleuser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(delFriend)

module.exports = router;