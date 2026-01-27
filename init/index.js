const mongoose = require('mongoose');
const Listing = require('../models/listing');
const initdata= require('./data.js');

const MONGO_URL="mongodb://127.0.0.1:27017/newhomes";
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

 const initDB =  async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Database initialized");
 }
initDB();