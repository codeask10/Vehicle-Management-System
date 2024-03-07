const express = require('express');
const router = express.Router();
var fetchuser = require('../Middleware/fetchUser')
const Products=require('../Modal/Product')

router.get("/fetchAllProduct",async (req, res) => {
    try {
        const data = await Products.find({});
        res.json(data);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

router.post("/create", fetchuser, async (req, res) => {
    try {
        let success=false;
        const { productName, quantity, poNumber, vendorID,category, price } = req.body;
        // If there are errors, return Bad request  and errors
        const vehicle = new Products({
            productName, quantity, poNumber, vendorID,category, price 
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
        const { productName, quantity, poNumber, vendorID,category, price }= req.body;
        //creating a new node object    
        const newData={};
        if(productName){newData.productName=productName}
        if(quantity){newData.quantity=quantity}
        if(poNumber){newData.poNumber=poNumber}
        if(category){newData.category=category}
        if(vendorID){newData.vendorID=vendorID}
        if(price){newData.price=price}

        let data =  await Products.findById(req.params.id);
        if(!data){return res.json({success,"message":"Not Found"})}

        data = await Products.findByIdAndUpdate(req.params.id,{$set :newData}, {new:true })
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
        let data =  await Products.findById(req.params.id);
        if(!data){return res.json({success,"message":"Not Found"})}
        // Allow the deletion only if user owns this note
    
        data = await Products.findByIdAndDelete(req.params.id)
        success=true;
        res.json( {success,data:data });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

module.exports = router; 