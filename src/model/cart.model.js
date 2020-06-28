const mongoose = require('mongoose');
const helper = require('../helpers/helper');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User Id is required.'],
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
        default: 0
    },
    total: {
        type: Number,
        required: [true, 'Total is required.'],
        default: 0,
        set: (value) => helper.toDecimalFixed(value)
    },
    products: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Product id is required.'],
        },
        name: {
            type: String,
            required: [true, 'Product Name is required.'],
        },
        price: {
            type: Number,
            required: [true, 'Product Price is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required.']
        }
    }],
}, {
    timestamps: true
});

CartSchema.methods = {
    toJSON() {
        return {
            id: this._id,
            user: this.user_id,
            quantity: this.quantity,
            total: helper.toDecimalFixed(this.total),
            products: this.products
        };
    }
};

module.exports = mongoose.model('cart', CartSchema);