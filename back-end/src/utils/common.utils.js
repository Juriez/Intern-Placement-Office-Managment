const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    return passwordMatches;
}

function generateJwtToken(obj, expiry) {
    const token = jwt.sign(obj, "jwt_secret", {
        expiresIn: expiry,
    });
    return token;
}

function verifyJwtToken(token) {
    try {
        const decoded = jwt.verify(token, "jwt_secret");
        return decoded;
    } catch (err) {
        return false;
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateJwtToken,
    verifyJwtToken,
};
