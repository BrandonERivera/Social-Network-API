const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must be Email'],
        },
        thoughts:[
            {
                type: Schema.type.ObjectId,
                ref: 'Thought',
            }],
        friends:[
            {
                type: Schema.type.ObjectId,
                ref: 'User',
            }],
    },
    {
        toJSON: {
            virtuals: true,
          },
    }

);

userSchema
  .virtual('friendcount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;