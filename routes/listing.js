const express= require('express');
const router=express.Router();
const { listingSchema, reviewSchema } = require('../schema');
const ExpressError=require('../utils/ExpressError');
const wrapAsync= require('../utils/wrapAsync');
const Listing = require('../models/listing');
const { isLoggedIn, isOwner, validateListing }= require('../middleware.js');
const multer  = require('multer');
const { storage } = require('../cloudConfig.js');

const upload=multer({ storage });

const listingcontroller = require('../controllers/listings.js');

 
router.get('/', wrapAsync(listingcontroller.index)); 

router.get('/new', isLoggedIn, listingcontroller.renderNewForm);

router.get('/:id', wrapAsync(listingcontroller.showListings));


router.post('/', isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingcontroller.createListing));
   router.get('/:id/edit',isLoggedIn, isOwner, wrapAsync(listingcontroller.renderEditForm));
   router.put('/:id',isLoggedIn, isOwner, validateListing, wrapAsync(listingcontroller.updateListing));

   router.delete('/:id',isLoggedIn, isOwner, wrapAsync(listingcontroller.destroyListing));

module.exports= router;