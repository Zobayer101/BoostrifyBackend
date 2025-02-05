
const jwt = require("jsonwebtoken");

exports.GenarateToken = (ID,Name) => {
    return jwt.sign({ ID, Name }, process.env.SECREAT);
}



