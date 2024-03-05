const mongoose= require('mongoose');
const {Schema}= mongoose

const productSchema = new Schema({
  productName: { 
    type: String, 
    required: true },
  quantity: { 
    type: Number 
  },
  poNumber: { 
    type: String, 
    required:true,
    unique:true 
  },
  vendorID: { type: Number, ref: 'vendors' },
  category: {
    type:String
  },
  price: {
    type:Number
  }

});

module.exports  = mongoose.model('Product', productSchema);

