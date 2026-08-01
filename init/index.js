const mongoose = require('mongoose');
const Listing = require('../models/listing');
const initdata= require('./data.js');

const MONGO_URL = "mongodb://mongo:27017/newhomes"; main()
    .then(async () => {
        console.log("connected to mongodb");
        await initDB();
    })
    .catch((err) => {
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
