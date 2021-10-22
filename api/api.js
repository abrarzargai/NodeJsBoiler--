const express = require('express');
const router = express.Router();

//Required api's 
const auth = require('./Routes/Auth')
const User = require('./Routes/User')
const Customer = require('./Routes/Customer')

/*********Main Api**********/
router.use('/user',User);
router.use('/auth', auth);
router.use('/customer', Customer);


module.exports = router;