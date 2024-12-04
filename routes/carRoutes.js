const express = require('express');
const carController = require('../controllers/carController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve all cars
 *     responses:
 *       200:
 *         description: A list of cars
 */
router.get('/cars', authenticate, carController.getCars);

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
 *       404:
 *         description: Car not found
 */
router.get('/cars/:id', authenticate, carController.getCarById);

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Car'
 *     responses:
 *       201:
 *         description: Car successfully created
 */
router.post('/cars', authenticate, carController.createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Car'
 *     responses:
 *       200:
 *         description: Car successfully updated
 *       404:
 *         description: Car not found
 */
router.put('/cars/:id', authenticate, carController.updateCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car successfully deleted
 *       404:
 *         description: Car not found
 */
router.delete('/cars/:id', authenticate, carController.deleteCar);

module.exports = router;
