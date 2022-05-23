const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');

const { v4: uuidv4 } = require('uuid');

const register = router.post('/register', (req, res) => {
    let { fname, lname, username, password, email } = req.body;
    db.pool.query(``)
});

module.exports = { register }