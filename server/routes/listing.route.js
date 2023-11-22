import express from 'express';
import verifyJWT from '../middleware/verifyJWT.js';
import { addListing,getAllListings, getCategoryCount, getListing } from '../controllers/listing.controller.js';

const router=express.Router();

router.get('/',getAllListings)
    .post('/',verifyJWT,addListing)
    .get('/:id',verifyJWT,getListing);

router.get('/category/count',getCategoryCount);
export default router;