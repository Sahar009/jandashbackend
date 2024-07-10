const express = require('express')
const { RegisterController } = require('../controllers/AuthController')

const route = express.Router()


route.post('/register',RegisterController)






module.exports = route