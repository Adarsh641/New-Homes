 const express = require('express');
 const app=express();
 const mongoose= require('mongoose');
 const MONGO_URL="mongodb://127.0.0.1:27017/newhomes";
 const Listing = require('./models/listing');
 const path= require('path');
 const methodOverride= require('method-override');

 app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname, 'views'));
 app.use(express.urlencoded({extended:true}));
 app.use(methodOverride('_method'));
 main()
    .then(()=>{
        console.log("connected to mongodb");
    })
    .catch((err)=>{
        console.log("error connecting to mongodb", err);
    });
 async function main(){
    await mongoose.connect(MONGO_URL);
 }
 app.get('/', (req, res)=>{
    res.send("hello world");
 })

 app.get('/listings', async(req, res)=>{
    const alllistings= await Listing.find({});
    res.render('listings/index.ejs', {alllistings});
 }); 

 app.get('/listing/new', (req, res)=>{
   res.render('listings/new.ejs');
 })
 app.post('/listings', async(req, res)=>{
   const newlisting= new Listing(req.body.listing);
   await newlisting.save();
   res.redirect('/listings');
 })
 app.get('/listings/:id/edit', async(req,res)=>{
   let {id}= req.params;
   const listing= await Listing.findById(id);
   res.render('listings/edit.ejs', {listing});
 })
 app.put('/listings/:id', async(req, res)=>{
   const {id}= req.params;
   await Listing.findByIdAndUpdate(id, {...req.body.listing});
   res.redirect('/listings');
 })
 app.get('/listings/:id', async(req, res)=>{
   const {id}=req.params;
   const listing= await Listing.findById(id);
   res.render('listings/show.ejs', {listing});
 })
 app.delete('/listings/:id', async(req, res)=>{
   const {id}= req.params;
   await Listing.findByIdAndDelete(id);
   res.redirect('/listings');
 })

 app.listen(8080, ()=>{
    console.log("server is running on port 8080");
 })