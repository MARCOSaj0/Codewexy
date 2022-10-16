const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true }
});

module.exports = mongoose.model('Coin', coinSchema);