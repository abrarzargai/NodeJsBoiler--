const mongoose = require("mongoose");
const validator = require("validator");
const argon2 = require('argon2');
const userSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: [true, "Please fill your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, " Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please fill your password"],
    minLength: 6,
    select: false,
  }
},
  {
    timestamps: true,
  });

userSchema.pre('save', async function(next) {
   this.password = await argon2.hash(this.password);
  next();
})
userSchema.pre('updateOne', async function (next) {
  this.getUpdate().password = await argon2.hash(this.getUpdate().password); 
  next();
})


const User = mongoose.model("User", userSchema);
module.exports = User;
