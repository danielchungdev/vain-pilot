const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');
const crypto = require('crypto'); 

const register = router.post('/register', (req, res) => {
    let { fname, lname, username, password, email } = req.body;

    //This hashes
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`); 

    console.log(hash);

    // db.pool.query(`INSERT INTO users(fname, lname, username, password, email)`)
});

module.exports = { register }