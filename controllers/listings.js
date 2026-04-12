const Listing = require('../models/listing.js');
module.exports.index = async(req, res)=>{
    const alllistings= await Listing.find({});
    res.render('listings/index.ejs', {alllistings});
 };

 module.exports.renderNewForm=(req, res)=>{
   res.render('listings/new.ejs');
 };

 module.exports.showListings=async(req, res)=>{
     const {id}=req.params;
     const listing= await Listing.findById(id).populate({ path: 'reviews', populate: { path: 'author' }}).populate('owner');
     if(!listing){
       req.flash('error', 'Cannot find that listing!');
       return res.redirect('/listings');
     }
 
     res.render('listings/show.ejs', {listing});
   }

module.exports.createListing=async(req, res, next )=>{
      let url=req.file.path;
      let filename=req.file.filename;
      const newlisting= new Listing(req.body.listing);
      newlisting.owner= req.user._id;
      newlisting.image={url, filename};
      await newlisting.save();
      req.flash('success', 'Successfully made a new listing!');
      res.redirect('/listings');
     
   }

module.exports.renderEditForm=async(req,res)=>{
     let {id}= req.params;
     const listing= await Listing.findById(id);
     if(!listing){
      req.flash('error', 'Cannot find that listing!');
      return res.redirect('/listings');
    }
     res.render('listings/edit.ejs', {listing});
   }

module.exports.updateListing=async(req, res)=>{ 
     let {id}= req.params;
     await Listing.findByIdAndUpdate(id, {...req.body.listing});
      req.flash('success', 'Successfully updated the listing!');

     res.redirect('/listings');
   }

   module.exports.destroyListing= async(req, res)=>{
      const {id}= req.params;
      let listing= await Listing.findById(id);
      if(!req.user || !listing.owner._id.equals(req.user._id)){
        req.flash('error', 'You do not have permission to delete this listing!');
        return res.redirect(`/listings/${id}`);
      }
      await Listing.findByIdAndDelete(id);
      req.flash('success', 'Successfully deleted the listing!');

      res.redirect('/listings');
    }