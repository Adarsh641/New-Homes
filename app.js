 if(process.env.NODE_ENV!="production"){
   require('dotenv').config();
 }
 const express = require('express');
 const app=express();
 const mongoose= require('mongoose');
 const MONGO_URL = process.env.MONGO_URL;
 const path= require('path');
 const methodOverride= require('method-override');
 const ExpressError=require('./utils/ExpressError');
 const ejsMate=require('ejs-mate') ;
 const session = require('express-session');
 const flash = require('connect-flash');
 
 const listings= require('./routes/listing.js');
 const reviews= require('./routes/review.js');
 const userRouter= require('./routes/user.js');
 const passport= require('passport');
 const LocalStrategy = require('passport-local').Strategy;
 const User= require('./models/user.js');
 app.engine('ejs', ejsMate);

 app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname, 'views'));
 app.use(express.urlencoded({extended:true}));
 app.use(methodOverride('_method'));
 app.use(express.static(path.join(__dirname, '/public'))); 

 const sessionOptions={
   secret: "mysupersecretcode",
   resave: false,
   saveUninitialized: true,
   cookie:{
      expires: Date.now() + 1000*60*60*24*7,
      maxAge: 1000*60*60*24*7,
      httpOnly: true,
   }
 }

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
 app.use(session(sessionOptions));
 app.use(flash());

 app.use(passport.initialize());
 app.use(passport.session());
 
 passport.use(new LocalStrategy(User.authenticate()));

 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   res.locals.currUser=req.user;
   next();
})

 
 
 app.use('/listings', listings);
 app.use('/listings/:id/reviews', reviews);
 app.use('/', userRouter);
 
 
 
 

 app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
 
 app.use((err, req, res, next)=>{
    let {statusCode, message}=err;
    if(!statusCode) statusCode=500;
    if(!message) message="Something went wrong";
    res.status(statusCode).render('error.ejs', { message});
 })

 app.listen(8080, ()=>{
    console.log("server is running on port 8080");
 })