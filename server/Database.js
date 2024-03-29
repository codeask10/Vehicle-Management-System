const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURL=process.env.REACT_APP_MONGOURL;
console.log(mongoURL);
 const connectToMongoose=async()=>{
    
 await mongoose.connect(
    mongoURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
     }
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));
 }
module.exports=connectToMongoose;