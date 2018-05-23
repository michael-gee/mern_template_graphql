const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcyrpt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  provider: {
    type: String,
    enum: ['local', 'github', 'google', 'facebook'],
    required: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true
  },

  displayName: String,
  password: String,
  photoURL: String,

  githubID: String,
  googleID: String,
  facebookID: String
});

// On Save Hook encrypt password
UserSchema.pre('save', function (next) {
  if (this.provider !== 'local') {
    return next();
  }

  const user = this;
  if (user.password) {
    bcyrpt.genSalt(10, function (err, salt) {
      bcyrpt.hash(user.local.password, salt, null, function (err, hash) {
        if (err) { return next(err); }
        user.local.password = hash;
        next();
      });
    })
  }
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcyrpt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return callback(err) }

    callback(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);
