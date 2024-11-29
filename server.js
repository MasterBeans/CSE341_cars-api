const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const carRoutes = require('./routes/carRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api', carRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => console.error('MongoDB connection error:', err))
