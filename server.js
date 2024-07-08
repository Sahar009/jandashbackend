const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const App = express()


App.get('/',(req,res) =>{
res.send('Server home page !!')
})


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
