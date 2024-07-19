const express = require('express')
const { RegisterController, loginController, logOutHandler } = require('../controllers/AuthController')
const { upload } = require('../utils/fileUpload')

const route = express.Router()


route.post('/register',upload.single('image'),RegisterController)
route.post('/login',loginController)
route.get('/logout',logOutHandler)

route.post('/test',upload.single('image'),(req,res) =>{
res.send('successfull')
})






module.exports = route