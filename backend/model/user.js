const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken")
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Name"]
    }, 

    avatar:{
        public_id:String,
        url:String
    },

    email:{
        type:String,
        unique:[true,"Email Already Exists"],
        required:[true, "Please Enter Email"]
    },

    password:{
        type:String,
        required:[true, "Please Enter Password"],
        minlength:[6, "Password must be atleast 6 characters"],
        select:false
    },

    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],

    story:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Story'
        }
    ],


    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],

    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],

    requests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],

    savedPost:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],

    resetPasswordToken :String,
    resetPasswordExpires: Date,
    
    
})


//before saving do hash password
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
     this.password = await bcrypt.hash(this.password ,10)
    }
    next();
})


UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.generateToken = function(){
   return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
    
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
      
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };



module.exports = mongoose.model('User', UserSchema);