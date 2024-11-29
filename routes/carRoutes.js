const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve a list of cars
 *     responses:
 *       200:
 *         description: A list of cars
 */
router.get('/cars', carController.getCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Retrieve a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *       400:
 *         description: Invalid car ID format
 */
router.get('/cars/:id', carController.getCarById);

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     responses:
 *       201:
 *         description: Car successfully created
 */
router.post('/cars', carController.createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Car successfully updated
 */
router.put('/cars/:id', carController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Car successfully deleted
 */
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;
