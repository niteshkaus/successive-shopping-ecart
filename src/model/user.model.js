const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User Name is required.'],
    trim: true
  },
  email_address: {
    type: String,
    unique: true,
    required: [true, 'Email Address is required.'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    trim: true
  },
}, 
{
  timestamps: true
});

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!'
});

UserSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      email_address: this.email_address,
    };
  }
};

module.exports = mongoose.model('user', UserSchema);