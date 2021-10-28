const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const argon2 = require('argon2');
var jwt = require('jsonwebtoken');



//******Genrating token****/

const signToken = (user) => {
    const payload = {
        userdata: {
            id: user._id,
        },
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });
};
/***************Services************/

//SignUp
exports.SignUp = catchAsync(async (req, res, next) => {
    const User = await userModel.find({ email: req.body.email })
    if (User.length < 1) {
        const Record = await userModel.create({ ...req.body })
        if (!Record) {
            throw new Error('Error! User cannot be created');
        }
        else {
            return res.status(201).json({
                success: true, message: "Account Created Successfully", Record
            })
        }
    }
    else {
        return next(new Error('Error! User already exist'))

    }
})

//Login
exports.Login = catchAsync(async (req, res, next) => {
    const User = await userModel.find({ email: req.body.email }).select('+password');
    console.log("user===>", User)
    if (User) {
        if (await argon2.verify(User[0].password, req.body.password)) {
            const token = signToken(User[0]);
            return res.status(200).json({
                success: true, message: "Login Successfully", token, User
            })
        }
        else {
            throw new Error('Error! Invalid Password');
        }
    }
    else {
        return next(new Error('User Not Found'))

    }
})

//Update
exports.Update = catchAsync(async (req, res, next) => {
    const data = {
        password: req.body.newpassword
    }
    console.log(req.body)
    const User = await userModel.find({ email: req.body.email }).select('+password');
    console.log(User)
    if (!User.length < 1) {
        if (await argon2.verify(User[0].password, req.body.oldpassword)) {
         
                        const Record = await userModel.updateOne({ email: req.body.email }, data);
                       console.log("here", Record)
                        console.log(Record.nModified)
                        if (Record.nModified > 0) {
                            return res.status(200).json({
                                success: true, message: "Account Updated Successfully"
                            })
                        }
                        return res.status(500).json({
                            success: false, message: "Error!  Account Not-Updated Successfully"
                        })
                    }
                    else{
                            return res.status(500).json({
                                success: false, message: "Error!  Old Password is not correct"
                            })
                    }
        }
    else {
        return next(new Error('User Not Found'))

    }

})
