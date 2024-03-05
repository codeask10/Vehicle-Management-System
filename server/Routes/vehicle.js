const express = require('express');
const router = express.Router();
var fetchuser = require('../Middleware/fetchUser');
const Vehicles = require("../Modal/Vehicle");


// Route 1 :- Get LoogedIn a user Details using :Get "api/notes/fetchAllNotes",  login required 
router.get("/fetchAllVehicle",async (req, res) => {
    try {
        const data = await Vehicles.find({});
        res.json(data);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

// Route 2 :- add  a notes using: Post "api/notes/addnotes",  login required 
router.post("/create", fetchuser, async (req, res) => {
    try {
        const { vehicleNumber, dcNumber, poNumber, checkInDateTime, driverName, vehicleType, deliveryLocation, vehicleImage, checkOutDateTime } = req.body;
        // If there are errors, return Bad request  and errors
        const vehicle = new Vehicles({
            vehicleNumber, dcNumber, poNumber, checkInDateTime, driverName, vehicleType, deliveryLocation, vehicleImage, checkOutDateTime 
        })
        // saving the notes 
        const saveVehicle= await vehicle.save();
        res.json(saveVehicle);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

//  Route  :- update an existing  notes using: Put "api/notes/update    ",  login required 
router.put("/update/:id", fetchuser, async (req, res) => {
    try {
        
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
         
        //Find the note to updated and update: checking the content is already available or not
        let data =  await Vehicles.findById(req.params.id);
        if(!data){return res.status(404).send("Not Found")}

        data = await Vehicles.findByIdAndUpdate(req.params.id,{$set :newData}, {new:true })
        res.json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})
//  Route 4 :- Delete an existing  notes using: Delete "api/notes/delete    ",  login required 
router.delete("/delete/:id", fetchuser, async (req, res) => {
    try {
        let data =  await Vehicles.findById(req.params.id);
        if(!data){return res.status(404).send("Not Found")}
        
    
        // Allow the deletion only if user owns this note
    
        data = await Vehicles.findByIdAndDelete(req.params.id);
        res.json( {"Success":"Vehicle has been deleted ",data:data });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

module.exports = router; 