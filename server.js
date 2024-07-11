const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const App = express()
const AuthRoute = require('./routes/authRoute')
const StudentRoute = require('./routes/studentRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')


App.get('/',(req,res) =>{
res.send('Server home page !!')
})


App.use(express.urlencoded({extended:false}))
App.use(express.json())
App.use(cookieParser())
App.use(cors([process.env.FRONTEND_URL]))



// middlewares
App.use('/api/user',AuthRoute)
App.use('/api/student',StudentRoute)

const PORT = process.env.PORT


mongoose.connect(process.env.MONGO_URL)
.then(
    ()=>{
        App.listen(PORT, () =>{
            console.log(`App now listening to port: ${PORT}`);
        })
    })
    .catch((err) =>{
        console.log(err.message)
    })
