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
    initdata.data = initdata.data.map((obj)=>({...obj, owner:"69a183ee88d71e477f929dc5"}));
    await Listing.insertMany(initdata.data);
    console.log("Database initialized");
 }
initDB();