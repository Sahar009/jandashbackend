const User = require("../model/User");
const JWT = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");
const sendMail = require("../utils/mails");
const passport = require("passport");
const async_handler = require("express-async-handler");
const os = require("os");
const cloudinary = require('../utils/cloudinary')
const generateToken = (id) => {
  return JWT.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const RegisterController = async_handler(async (req, res) => {
  const { firstName, lastName, role, email, password } = req.body;
  const image = req.file;

  try {
    if (!firstName || !lastName || !role || !email || !password) {
      return res.status(400).json("All fields are required");
    }
    if (password.length < 8) {
      return res.status(400).json("Password must be at least 8 characters");
    }

    const Salt = Bcrypt.genSaltSync(10);
    const HashedPassword = Bcrypt.hashSync(password, Salt);

    const EmailExist = await User.findOne({ email: email });
    if (EmailExist) {
      return res.status(400).json("Email already exists");
    }

    let imageUrl = "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png";

    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "users",
      });
      imageUrl = result.secure_url;
    }

    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: HashedPassword,
      role,
      image: imageUrl,
    });

    const Token = generateToken(createdUser._id);

    const subject = "Welcome to Jan dash";
    const email_to = email;
    const body_message = `<h1 style="color:orangered">Thank you for registering ${firstName}</h1><br><button style="color:'red'; border:none; background:black;">Click here to go to Dashboard<button>`;

    if (createdUser) {
      sendMail({ subject, email_to, body_message });
      res.status(201).json({ createdUser, Token });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});


const loginController = async_handler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });

    // password check
    const passwordIsCorrect = await Bcrypt.compareSync(
      password,
      userExist.password
    );

    //  validation
    if (!userExist) {
      return res
        .status(400)
        .json("email does not exist please create an account");
    }
    if (!userExist || !passwordIsCorrect) {
      return res.status(400).json("incorrect login credentials");
    }

    if (userExist && passwordIsCorrect) {
      const Token = generateToken(userExist._id);
      res.cookie("token", Token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 7200),
        secure: true,
      });
      return res.status(200).json({ message: "login successfully", Token });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});


const logOutHandler = async_handler(async (req, res) => {
  res.cookie("token", "", {
    path: "/login",
    httpOnly: true,
    expires: new Date(Date.now() - 1000), // Setting the expiration time to 1 second in the past
    secure: true,
  });
  res.status(200).send({ message: "Logged out successfully" });
});



// console.log(os.version())
module.exports = { RegisterController, loginController, logOutHandler };
