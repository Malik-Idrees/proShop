const express = require('express')
const router = express.Router()
const productModels = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')
const { getProducts, getProductById, createProductReview } = productModels

//router.get('/',getProducts)
router.route('/').get(getProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getProductById)

module.exports = router
