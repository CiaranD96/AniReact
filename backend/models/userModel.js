const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    animeList: [
      {
        mal_id: { type: Number, required: true },
        name: { type: String, required: true },
        status: {
          type: String,
          required: true,
          enum: [
            'watching',
            'completed',
            'plan to watch',
            'on hold',
            'dropped',
          ],
          image_url: { type: String, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
