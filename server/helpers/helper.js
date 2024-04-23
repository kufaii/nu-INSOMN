const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const createToken = (payload) => jwt.sign(payload, SECRET);
const verifyToken = (token) => jwt.verify(token, SECRET);

const crypt = (password) => bcryptjs.hashSync(password, 8);
const compare = (input, password) => bcryptjs.compareSync(input, password);

module.exports = {createToken, verifyToken, crypt, compare}