const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const category = require('./category.model');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product Name is required.'],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Category is required.'],
    ref: 'category'
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
    trim: true
  },
  price: {
    type: String,
    required: [true, 'Price is required.'],
    trim: true
  },
  make: {
    type: Number,
    required: [true, 'Make year is required.'],
    trim: true
  }
}, 
{
  timestamps: true
});

ProductSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      category: this.category,
      description: this.description,
      price: this.price,
      make: this.make
    };
  }
};

module.exports = mongoose.model('product', ProductSchema);