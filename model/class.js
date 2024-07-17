const mongoose = require('mongoose')

const ClassSchema =mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'name must be filled'],
        trim:true
    },
    lastName:{
        type:String,
        required:[true, 'name must be filled'],
        trim:true
    },
    email:{
        type:String,
        required:[true, 'email must be filled'],
        unique: true,
        trim:true
    },
    password:{
        type:String,
        minLenght:[8,'password is too short '],

    },
    role: {
        type:String,
        // enum:'Teacher' || "Principal",
        default:'Teacher'
    },
    image:{
        type:Object,
        default:"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
    }

},
{
    timestamps: true
}
)


const Class = mongoose.model('users',ClassSchema)

module.exports = Class