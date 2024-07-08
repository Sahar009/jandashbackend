const mongoose = require('mongoose')

const UserSchema =mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name must be filled']
    },
    email:{
        type:String,
        required:[true, 'email must be filled'],
        unique: true
    },
    password:{
        type:String,
        minLenght:[8,'password is too short '],

    },
    role: {
        type:String,
        enum:'user' || "admin",
        default:'user'
    },
    image:{
        type:Object,
        default:"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
    }

},
{
    timesstamps: true
}
)


const User = mongoose.model('users',UserSchema)

module.exports = User