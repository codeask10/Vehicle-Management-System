const express = require('express');
const router = express.Router();
var fetchuser = require('../Middleware/fetchUser');
const Vendor=require('../Modal/Vendor');


// Route 1 :- Get LoogedIn a user Details using :Get "api/notes/fetchAllNotes",  login required 
router.get("/fetchAllVendor",async (req, res) => {
    try {
        const data = await Vendor.find({});
        res.json(data);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

// Route 2 :- add  a notes using: Post "api/notes/addnotes",  login required 
router.post("/create", fetchuser, async (req, res) => {
    try {
        const { id,vendorName, companyName, phone, email, dcNumber, address } = req.body;
        // If there are errors, return Bad request  and errors
        const vehicle = new Vendor({
            id, vendorName, companyName, phone, email, dcNumber, address 
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

         
        //Find the note to updated and update: checking the content is already available or not
        let data =  await Vendor.findById(req.params.id);
        if(!data){return res.status(404).send("Not Found")}

        data = await Vendor.findByIdAndUpdate(req.params.id,{$set :newData}, {new:true })
        res.json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})
//  Route 4 :- Delete an existing  notes using: Delete "api/notes/delete    ",  login required 
router.delete("/delete/:id", fetchuser, async (req, res) => {
    try {
        let data =  await Vendor.findById(req.params.id);
        if(!data){return res.status(404).send("Not Found")}
        // Allow the deletion only if user owns this note
        data = await Vendor.findByIdAndDelete(req.params.id);
        res.json( {"Success":"Vendor has been deleted ",data:data });    
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

module.exports = router; 