const mongoose= require('mongoose');
const {Schema}= mongoose

const UserSchema= new Schema({
    firstName:{
        type:String,
        required:true,
        minlength: 3, 
        maxlength: 20
    },
    lastName:{
        type:String,
        required:true,
        minlength: 3, 
        maxlength: 20
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    date:{
        type:Date,
        default:Date.now
    }
  });
module.exports=mongoose.model("user", UserSchema);