const User = require("../model/User");

const JWT = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");

// create a registration function

const generateToken = (id) =>{
    return JWT.sign({_id:id}, process.env.JWT_SECRET,{expiresIn:"1h"})
}

const RegisterController = async (req, res) => {
  const { firstName, lastName, role, email, password } = req.body;

  try {
    // validations
    if (!firstName || !lastName || !role || !email || !password ) {
      return res.status(400).json("all filled required ");
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json("password must not be less than 8 characters ");
    }
    const Salt = Bcrypt.genSaltSync(10)
    const HashedPassword = Bcrypt.hashSync(password,Salt)

    const EmailExist = await User.findOne({ email });
    if (EmailExist) {
      return res.status(400).json("email already exist");
    }

   
//    generate and send 4 digit token to email
   
   
   
   
   
   
  
   
    // create a user 
    const createdUser =await User.create({
        firstName:firstName,
        lastName:lastName,
        email :email,
        password: password,
        role:role,
        image:image
    })
// genarate token 
const Token =generateToken(createdUser._id)

    if(createdUser){
        
        res.status(201).json({
    createdUser
        })
       
    }


  } catch (error) {
    res.status(500).json(error.message);
  }
};




module.exports ={
    RegisterController
}