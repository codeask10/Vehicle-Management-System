const express = require('express');
const router = express.Router();
var fetchuser = require('../Middleware/fetchUser');
const Vehicles = require("../Modal/Vehicle");


router.get("/fetchAllVehicle",async (req, res) => {
    try {
        const data = await Vehicles.find();
        res.json(data);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})
router.post("/create", fetchuser, async (req, res) => {
    try {
        let success=false;
        const { vehicleNumber, dcNumber, poNumber, checkInDateTime, driverName, vehicleType, deliveryLocation, vehicleImage, checkOutDateTime } = req.body;
        // If there are errors, return Bad request  and errors
        const vehicle = new Vehicles({
            vehicleNumber, dcNumber, poNumber, checkInDateTime, driverName, vehicleType, deliveryLocation, vehicleImage, checkOutDateTime 
        })
        const saveVehicle= await vehicle.save();
        success=true;
        res.json({success,saveVehicle});

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

router.put("/update/:id", fetchuser, async (req, res) => {
    try {
        let success=false;
        const { vehicleNumber, dcNumber, poNumber, checkInDateTime, driverName, vehicleType, deliveryLocation, vehicleImage, checkOutDateTime }= req.body;
    
        //creating a new node object    
        const newData={};
        if(vehicleNumber){newData.vehicleNumber=vehicleNumber}
        if(dcNumber){newData.dcNumber=dcNumber}
        if(poNumber){newData.poNumber=poNumber}
        if(checkInDateTime){newData.checkInDateTime=checkInDateTime}
        if(driverName){newData.driverName=driverName}
        if(vehicleType){newData.vehicleType=vehicleType}
        if(deliveryLocation){newData.deliveryLocation=deliveryLocation}
        if(vehicleImage){newData.vehicleImage=vehicleImage}
        if(checkOutDateTime){newData.checkOutDateTime=checkOutDateTime}
        
        let data =  await Vehicles.findById(req.params.id);
        if(!data){
            return res.json({success,"message":"Not Found"})
        };
        data = await Vehicles.findByIdAndUpdate(req.params.id,{$set :newData}, {new:true })
        success=true;
        res.json({success,data});
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})
router.delete("/delete/:id", fetchuser, async (req, res) => {
    try {
        let success=false;
        let data =  await Vehicles.findById(req.params.id);
        if(!data){return res.json({success,"message":"Not Found"})};
        
    
        // Allow the deletion only if user owns this note
        data = await Vehicles.findByIdAndDelete(req.params.id);
        success=true;
        res.json( {success,data:data }); 
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

module.exports = router; 