const mongoose= require('mongoose');
const {Schema}= mongoose

const vehicleSchema = new Schema({
  vehicleNumber: 
  { type: String, 
    required: true 
  },
  dcNumber: { 
    type: String, 
    required: true 
  },
  poNumber: {
     type: String, 
     required: true 
    },
  checkInDateTime: { 
    type: Date
   },
  driverName: {
    type:String
  },
  vehicleType: {
    type:String
  },
  qualityCheck:{
    type:String,
    default: 'Pending'
  },
  deliveryLocation:{
    type:String
  },
  vehicleImage:{
    type:String
  },
  checkOutDateTime: { 
    type: Date,
    default:Date.now
  }
});

module.exports= mongoose.model('vehicles', vehicleSchema); 