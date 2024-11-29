const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, min: 1886 },
    price: { type: Number, required: true, min: 0 },
    color: { type: String, required: true },
    mileage: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Car', carSchema);
