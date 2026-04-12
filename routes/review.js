const express= require('express');
const router=express.Router({mergeParams: true});
const wrapAsync= require('../utils/wrapAsync');
const ExpressError=require('../utils/ExpressError');
const { listingSchema, reviewSchema } = require('../schema');
const Review= require("../models/review.js")
const Listing = require("../models/listing.js")
const { isLoggedIn, validateReview , isReviewAuthor}= require('../middleware.js');
const reviewcontroller = require('../controllers/reviews.js');



router.post('/', isLoggedIn, validateReview, wrapAsync(reviewcontroller.createReview));

 router.delete('/:reviewId', isLoggedIn, isReviewAuthor,   wrapAsync(reviewcontroller.destroyReview)); 

module.exports = router;