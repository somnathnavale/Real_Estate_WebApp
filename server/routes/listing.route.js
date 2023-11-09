import express from 'express';
import verifyJWT from '../middleware/verifyJWT.js';
import { addListing,getAllListings } from '../controllers/listing.controller.js';

const router=express.Router();

router.get('/',verifyJWT,getAllListings)
    .post('/',verifyJWT,addListing)

export default router;