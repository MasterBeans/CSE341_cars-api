const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Cars API',
        description: 'API for managing cars',
        version: '1.0.0',
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
            mileage: 10000,
            available: true,
        },
    },
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./server.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    if (process.env.NODE_ENV !== 'production') {
        require('./server')
    }
})
