const Car = require('../models/carModel')
const Joi = require('joi')

// Validation rules using the Joi Library
const carSchema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().min(1886).required(),
    price: Joi.number().min(0).required(),
    color: Joi.string().required(),
    mileage: Joi.number().min(0).required(),
    available: Joi.boolean(),
})

// CREATE
exports.createCar = async (req, res) => {
    try {
        const { error } = carSchema.validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })

        const newCar = new Car(req.body)
        await newCar.save()
        res.status(201).json(newCar)
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message })
    }
}

// READ
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find()
        res.status(200).json(cars)
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message })
    }
};

exports.getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json(car);
    } catch (err) {

        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid car ID format' });
        }
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// UPDATE
exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = carSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCar) return res.status(404).json({ message: 'Car not found' });

        res.status(200).json(updatedCar);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// DELETE
exports.deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) return res.status(404).json({ message: 'Car not found' });

        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
