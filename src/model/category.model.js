const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product Name is required.'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Category is required.'],
    trim: true
  }
}, 
{
  timestamps: true
});

CategorySchema.methods = {
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      type: this.type
    };
  }
};

module.exports = mongoose.model('category', CategorySchema);