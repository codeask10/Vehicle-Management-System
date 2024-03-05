const express = require('express');
const router = express.Router();
var fetchuser = require('../Middleware/fetchUser')
const Products=require('../Modal/Product')

// Route 1 :- Get LoogedIn a user Details using :Get "api/notes/fetchAllNotes",  login required 
router.get("/fetchAllProduct",async (req, res) => {
    try {
        const data = await Products.find({});
        res.json(data);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

// Route 2 :- add  a notes using: Post "api/notes/addnotes",  login required 
router.post("/create", fetchuser, async (req, res) => {
    try {
        const { productName, quantity, poNumber, vendorID,category, price } = req.body;
        // If there are errors, return Bad request  and errors
        const vehicle = new Products({
            productName, quantity, poNumber, vendorID,category, price 
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
        
        const { productName, quantity, poNumber, vendorID,category, price }= req.body;
        //creating a new node object    
        const newData={};
        if(productName){newData.productName=productName}
        if(quantity){newData.quantity=quantity}
        if(poNumber){newData.poNumber=poNumber}
        if(category){newData.category=category}
        if(vendorID){newData.vendorID=vendorID}
        if(price){newData.price=price}

         
        //Find the note to updated and update: checking the content is already available or not
        let data =  await Products.findById(req.params.id);
        if(!data){return res.status(404).send("Not Found")}

        data = await Products.findByIdAndUpdate(req.params.id,{$set :newData}, {new:true })
        res.json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})
//  Route 4 :- Delete an existing  notes using: Delete "api/notes/delete    ",  login required 
router.delete("/delete/:id", fetchuser, async (req, res) => {
    try {
        let data =  await Products.findById(req.params.id);
        if(!data){return res.status(404).send("Not Found")}
        
    
        // Allow the deletion only if user owns this note
    
        data = await Products.findByIdAndDelete(req.params.id)
        res.json( {"Success":"Vehicle has been deleted ",data:data });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

module.exports = router; 