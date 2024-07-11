const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
   firstName:{
    type:String,
    required:[true,'name must be filled'],
    trim:true
   } ,
   lastName:{
    type:String,
    required:[true,'name must be filled'],
    trim:true
   } ,
email:{
    type:String,
    required:[true,"name must be filled"],
    unique:true,
    trim:true
    } ,
  image:{
    type:Object,
    default:"https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
    
  }  ,
  Class:{
    type:String,
    required:[true,'class must be filled']
  },
  address:{
    type:String,
    min: [6, 'address too short!'],
    max: 12
  },
  refNumber:{
    type:Number,
    unique:true,
    required:true
  },
  age:{
    type:Number,
    max:2,

  },
  gender:{
    type:String,
    enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not supported'
      ,
    },
     default:'none',
    required:true,
  },
  dateOfBirth:{
    type: String,
    required: true
  }
},{
    timestamps: true
}
)

const Student = mongoose.model('students', StudentSchema)

module.exports = Student



