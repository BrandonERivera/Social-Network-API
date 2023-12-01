const { User, Thought } = require('../models');

module.exports = {
    getusers(req,res) {
        User.find()
        .then((user)=> res.json(user))
        .catch((err) => res.status(500).json(err));
  },
    getsingleuser(req,res){
        User.findOne({_id: req.parms.userId})
        .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
    deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId})
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User with that ID' })
          : User.deleteMany({ _id: { $in: user.thoughts} })
      )
      .then(() => res.json({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
    updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    addFriend(req, res) {
    console.log('adding friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No User with this ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    delFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No User with this ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
}