const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters and spaces";
const lengthErr = "cannot be blank";


const validateUser = [
    body("firstName").optional()
        .trim()
        .matches(/^[a-zA-Z\s]+$/, 'i').withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1 }).withMessage(`First name ${lengthErr}`),
    body("lastName").optional()
        .trim()
        .matches(/^[a-zA-Z\s]+$/, 'i').withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1 }).withMessage(`Last name ${lengthErr}`),
    body("brand").optional()
        .trim()
        .matches(/^[a-zA-Z\s]+$/, 'i').withMessage(`Brand name ${alphaErr}`)
        .isLength({ min: 1 }).withMessage(`Brand name ${lengthErr}`),
    body("CorporateOrCharity").trim()
        .isLength({ min: 1}).withMessage(`Corporate or charity ${lengthErr}`),
];

module.exports = validateUser;