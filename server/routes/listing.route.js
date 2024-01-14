const express = require('express');
const verifyJWT =require('../middleware/verifyJWT.js');
const { addListing,deleteListing,getAllListings, getCategoryCount, getListing, updateListing, getGeocode, generateDescription } = require('../controllers/listing.controller.js');

const router=express.Router();

router.get('/',getAllListings)
    .post('/',verifyJWT,addListing)
    .get('/:id',getListing)
    .delete('/:id',verifyJWT,deleteListing)
    .put('/:id',verifyJWT,updateListing);

router.get('/category/count',getCategoryCount);

router.get("/geocode/address",verifyJWT,getGeocode);

router.post("/generate/description",verifyJWT,generateDescription);

module.exports=router;