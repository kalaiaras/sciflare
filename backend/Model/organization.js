const mongoose = require('mongoose');
const organizationschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
}) ;
module.exports =mongoose.model("Organization", organizationschema); 