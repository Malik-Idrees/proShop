const express = require('express')
const router = express.Router()
const authUser = require('../controllers/userController')

//router.get('/',getProducts)
router.post('/login', authUser)

module.exports = router
