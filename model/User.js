

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  image:{
    type:Object,
    default:"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
}

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
