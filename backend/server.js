const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const middleware = require('./middleware/errorMiddleware')
const { notFound, errorHandler } = middleware
const morgan = require('morgan')
const colors = require('colors')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config()
connectDB()

const app = express()
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
}
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
   res.send(process.env.PAYPAL_CLIENT_ID)
)

const __currentDirectory = path.resolve()


if(process.env.NODE_ENV === 'production'){
   app.use(express.static(path.join(__currentDirectory,'/frontend/build')))

   app.get('*',(req,res) =>
   res.sendFile(path.resolve(__currentDirectory,'frontend','build','index.html'))
   )
} else {
   app.get('/', (req, res) => {
      res.send('API is running...')
   })
}

//Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
   PORT,
   console.log(
      `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
         .bold
   )
)
