const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Cars and Auth API',
        description: 'API for managing cars and user authentication.',
    },
    host: 'localhost:5000',
    schemes: ['http'],
    definitions: {
        Car: {
            make: 'Toyota',
            model: 'Corolla',
            year: 2023,
            price: 20000,
            color: 'White',
            mileage: 5000,
            available: true,
        },
        User: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword',
        },
    },
};

const outputFile = './swagger-output.json'; // Ensure this matches your server's expected file
const endpointsFiles = ['./routes/authRoutes.js', './routes/carRoutes.js']; // Update as needed

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation successfully generated!');
    require('./server'); // Start server after Swagger generation
});
