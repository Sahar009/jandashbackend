const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const App = express()
const AuthRoute = require('./routes/authRoute')
const StudentRoute = require('./routes/studentRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const session = require('express-session');
const passport = require('./utils/passport')

App.get('/', (req, res) => {
    res.send('Server home page !!')
})


App.use(express.urlencoded({ extended: false }))
App.use(express.json())
App.use(cookieParser())
App.use(cors([process.env.FRONTEND_URL]))
// App.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true
//   }));
  
  // App.use(passport.initialize());
  // App.use(passport.session());
  
 
  // App.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  // App.get('/auth/google/callback', 
  //   passport.authenticate('google', { failureRedirect: '/' }),
  //   (req, res) => {
  //     // Successful authentication
  //     res.redirect('/'); 
  //   }
  // );


// middlewares
App.use('/api/user', AuthRoute)
App.use('/api/student', StudentRoute)

const PORT = process.env.PORT || 10000


mongoose.connect(process.env.MONGO_URL)
    .then(
        () => {
            App.listen(PORT, () => {
                console.log(`App now listening to port: ${PORT}`);
            })
        })
    .catch((err) => {
        console.log(err.message)
    })
