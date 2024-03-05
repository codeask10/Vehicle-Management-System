const mongoose= require('mongoose');
const {Schema}= mongoose
const VendorSchema = new Schema({
  id:{
    type:Number,
    required:true,
    unique:true
  },
  vendorName: { 
    type: String, 
    required: true 
  },
  companyName: {
    type:String
  },
  phone: {
    type:String
  },
  email:{type:String},
  dcNumber: {
    type:String,
    required:true,
    unique:true
  },
  address: {
    type:String,
  },
});

module.exports  = mongoose.model('Vendor', VendorSchema);