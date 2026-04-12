const Listing = require('./models/listing.js');
const Review = require('./models/review.js');

const { listingSchema, reviewSchema } = require('./schema');
const ExpressError=require('./utils/ExpressError');


module.exports.isLoggedIn= (req, res, next)=>{
  
    if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash('error', 'You must be signed in to create a listing!');
    return res.redirect('/login');
  }
  next();
}

module.exports.saveRedirectUrl=(req, res, next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
    delete req.session.redirectUrl;
  }
  next();
} 

module.exports.isOwner= async(req, res, next)=>{
  let {id}= req.params;
  const listing= await Listing.findById(id);
  if(!req.user || !listing.owner._id.equals(req.user._id)){
    req.flash('error', 'You do not have permission to perform this action!');
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing=((req, res, next)=>{
     let {error}=listingSchema.validate(req.body);
     if(error){
       throw new ExpressError(error, 400);
     }else{
       next();
     }
  })


 module.exports.validateReview=((req, res, next)=>{
      let {error}=reviewSchema.validate(req.body);
      if(error){
        throw new ExpressError(error, 400);
      }else{
        next();
      }
   })


module.exports.isReviewAuthor= async(req, res, next)=>{
  let { id, reviewId}= req.params;
  let review= await Review.findById(reviewId);
  if(!req.user || !review.author._id.equals(req.user._id)){
    req.flash('error', 'You do not have permission to perform this action!');
    return res.redirect(`/listings/${id}`);
  }
  next();
}
  