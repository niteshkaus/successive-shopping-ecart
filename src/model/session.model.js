const mongoose = require('mongoose');
const user = require('./user.model');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Session Id is required']
  },
  token: {
    type: String,
    required: [true, 'Token is required.'],
    trim: true
  }
}, 
{
  timestamps: true
});


SessionSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      user: this.user_id,
      token: this.token,
    };
  }
};

module.exports = mongoose.model('session', SessionSchema);