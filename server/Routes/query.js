const express = require('express');
const router = express.Router();
var fetchuser = require('../Middleware/fetchUser')
const Products=require('../Modal/Product');
const Vendor = require('../Modal/Vendor');
const Vehicle=require('../Modal/Vehicle')

router.get("/query/:id", fetchuser,async (req, res) => {
    let query =  await Products.findOne({ poNumber:  req.params.id})
    if(!query){return res.status(404).send("Not Found")}
    let vendorData=await Vendor.findOne({ id: query.vendorID});
    let productDetails=await Products.find({vendorID:query.vendorID});
    res.status(200).send({vendorData,productDetails});
})
router.put("/vehicle/:id", fetchuser,async (req, res) => {
    const { qualityCheck } = req.body;
    const vehicle = await Vehicle.updateOne(
        {_id:req.params.id},
        { $set: { qualityCheck: qualityCheck } }
      );
    res.json(vehicle);
})

module.exports = router; 