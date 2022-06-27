const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'The name should be at least 2 characters']
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (image) {
                return image.includes('http');
            },
            message: 'The image must start with http/s!'
        }
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (price) {
                return price >= 0
            },
            message: 'The price should be a positive number'
        }
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'The description should be at least 10 characters']
    },
    paymentMethod: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: true,
    },
    cryptoBuyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;