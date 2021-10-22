const { check, validationResult } = require('express-validator');

exports.validationFunction = async (req, res, next) => {
	const errors = validationResult(req);
	errors.type = 'expressValidationError';
	if (!errors.isEmpty()) {
		return res.status(500).jsonp(errors.array());
	}
	next();
};
/******User ******/
//signup
exports.SignupValidation = [
	check('email', "Must Enter Email")
		.isEmail()
		.withMessage("Enter Valid Email"),
	check('password', "Must Enter password")
		.isLength({ min: 5 })
		.withMessage("Password must be greater than 5 characters"),
];

