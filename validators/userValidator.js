const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters";


const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`),
];

module.exports = validateUser;