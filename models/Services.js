const mongoose = require("mongoose");
const { Number, Boolean } = require("mongoose/lib/schema/index");
const validator = require("validator");
const Schema = mongoose.Schema
const ServicesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    prices: {
        type: Number,
    },
    person:{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }
});

const Services = mongoose.model("Services", ServicesSchema);
module.exports = Services;