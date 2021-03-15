const express = require('express')
const router = express.Router()
const productModels = require('../controllers/productController')
const { getProducts, getProductById } = productModels

//router.get('/',getProducts)
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

module.exports = router
