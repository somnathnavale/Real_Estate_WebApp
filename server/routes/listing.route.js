const express = require('express');
const verifyJWT =require('../middleware/verifyJWT.js');
const { addListing,deleteListing,getAllListings, getCategoryCount, getListing, updateListing, getGeocode } = require('../controllers/listing.controller.js');

const router=express.Router();

router.get('/',getAllListings)
    .post('/',verifyJWT,addListing)
    .get('/:id',getListing)
    .delete('/:id',verifyJWT,deleteListing)
    .put('/:id',verifyJWT,updateListing);

router.get('/category/count',getCategoryCount);

router.get("/geocode/address",getGeocode);

module.exports=router;