const express = require('express');
const database=require('./Database');
const cors=require('cors');
const dotenv = require('dotenv');
const vehicleData=require('./Vehicle.json');
const VendorData=require('./Vendor.json');
const productData=require('./Product.json');
const Vehicle=require('./Modal/Vehicle');
const Vendor=require('./Modal/Vendor');
const Product=require('./Modal/Product');
dotenv.config();

const port=5002;

const app=express();
app.use(express.json());
app.use(cors());

database();

const addMockData = async () => {
    try {
      const vehicle = await Vehicle.find({});
      const vendor = await Vendor.find({});
      const product = await Product.find({});

      if(!vehicle && !vendor && !product){
      // Remove existing data from the collection
        await Vehicle.deleteMany();
        await Vendor.deleteMany();
        await Product.deleteMany();
    
        // Insert mock data into the collection
        await Vehicle.insertMany(vehicleData);
        await Vendor.insertMany(VendorData);
        await Product.insertMany(productData);
        console.log('mock data added to MongoDB');
      }
    } catch (error) {
      console.error('Error populating database:', error);   
    }
  };

app.use("/api/user", require("./Routes/users"));
app.use("/api/vehicle", require("./Routes/vehicle"));
app.use("/api/vendor", require("./Routes/vendor"));
app.use("/api/product", require("./Routes/product"));
app.use("/api/Query", require("./Routes/query"));

app.listen(port,()=>{
    console.log(`Vehicle Management System backend listening on Port http://localhost:${port}`)
});

addMockData();



