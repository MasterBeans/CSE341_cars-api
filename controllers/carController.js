const Car = require('../models/carModel');
const Joi = require('joi');

const carSchema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(1886).required(),
    price: Joi.number().min(0).required(),
    color: Joi.string().required(),
    mileage: Joi.number().min(0).required(),
    available: Joi.boolean(),
});

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) return res.status(404).json({ message: 'Car not found.' });
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

exports.createCar = async (req, res) => {
    try {
        const { error } = carSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = carSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const car = await Car.findByIdAndUpdate(id, req.body, { new: true });
        if (!car) return res.status(404).json({ message: 'Car not found.' });
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findByIdAndDelete(id);
        if (!car) return res.status(404).json({ message: 'Car not found.' });
        res.status(200).json({ message: 'Car deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
