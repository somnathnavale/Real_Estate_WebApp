import express from 'express';
import verifyJWT from '../middleware/verifyJWT.js';
import { addListing,deleteListing,getAllListings, getCategoryCount, getListing, updateListing } from '../controllers/listing.controller.js';

const router=express.Router();

router.get('/',getAllListings)
    .post('/',verifyJWT,addListing)
    .get('/:id',getListing)
    .delete('/:id',verifyJWT,deleteListing)
    .put('/:id',verifyJWT,updateListing);

router.get('/category/count',getCategoryCount);
export default router;