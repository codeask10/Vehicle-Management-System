const express = require('express');
const router = express.Router();
var fetchuser = require('../Middleware/fetchUser');
const Vendor=require('../Modal/Vendor');


router.get("/fetchAllVendor",async (req, res) => {
    try {
        const data = await Vendor.find();
        res.json(data);

    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
})

router.post("/create", fetchuser, async (req, res) => {
    try {
        let success=false;
        const { id,vendorName, companyName, phone, email, dcNumber, address } = req.body;
        // If there are errors, return Bad request  and errors
        const vehicle = new Vendor({
            id, vendorName, companyName, phone, email, dcNumber, address 
        })
        // saving the notes 
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
        const { id,vendorName, companyName, phone, email, dcNumber, address }= req.body;
    
        //creating a new node object    
        const newData={};
        if(id){newData.id=id}
        if(vendorName){newData.vendorName=vendorName}
        if(dcNumber){newData.dcNumber=dcNumber}
        if(companyName){newData.companyName=companyName}
        if(phone){newData.phone=phone}
        if(email){newData.email=email}
        if(address){newData.address=address}

        let data =  await Vendor.findById(req.params.id);
        if(!data){
            return res.json({success,"message":"Not Found"})
        };

        data = await Vendor.findByIdAndUpdate(req.params.id,{$set :newData}, {new:true })
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
        let data =  await Vendor.findById(req.params.id);
        if(!data){return res.json({success,"message":"Not Found"})};
        // Allow the deletion only if user owns this note
        data = await Vendor.findByIdAndDelete(req.params.id);
        success=true;
        res.json( {success,data:data });    
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

module.exports = router; 