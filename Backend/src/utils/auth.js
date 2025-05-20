// utils/auth.js
const bcrypt = require('bcrypt');

async function comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

module.exports = {
    comparePasswords
};
