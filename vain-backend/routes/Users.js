const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');
const crypto = require('crypto'); 

const register = router.post('/register', (req, res) => {
    let { fname, lname, username, password, email } = req.body;

    //This hashes
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`); 
    db.pool.query(`INSERT INTO 
                    users(fname, lname, username, password, email) 
                    VALUES ('${fname}', '${lname}', '${username}', '${hash}', '${email}')`)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `inserted ${result} column.`});
    })
    .catch( err => {
        console.log(err);
        res.status(400).send({message: `There's been an error!`});
    })
});

const 

module.exports = { register }