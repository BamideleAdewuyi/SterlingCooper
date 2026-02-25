const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters and spaces";
const lengthErr = "cannot be blank";


const validateUser = [
    body("firstName").trim()
        .matches(/^[a-zA-Z\s]+$/, 'i').withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
        .matches(/^[a-zA-Z\s]+$/, 'i').withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1 }).withMessage(`Last name ${lengthErr}`),
];

module.exports = validateUser;