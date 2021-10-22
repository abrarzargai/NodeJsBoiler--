const mongoose = require("mongoose");
const { Number, Boolean } = require("mongoose/lib/schema/index");
const validator = require("validator");

const CustomerSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
      
    },
    password: {
        type: String,
        
    },
    active: {
        type: Boolean,
        
    },
    city: {
        type: String,
       
    },
   
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;