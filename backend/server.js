const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const middleware = require('./middleware/errorMiddleware')
const { notFound, errorHandler } = middleware
const colors = require('colors')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//Middlewares
app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
   res.send('API is running...')
})

const PORT = process.env.PORT || 5000
app.listen(
   PORT,
   console.log(
      `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
         .bold
   )
)
