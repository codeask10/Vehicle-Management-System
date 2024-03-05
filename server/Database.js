const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURL=process.env.REACT_APP_MONGOURL;
console.log(mongoURL);
 const connectToMongoose=()=>{
    mongoose.connect(mongoURL)
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((err)=>{
        console.error("MongoDb connection error",err);
    });
 }
module.exports=connectToMongoose;