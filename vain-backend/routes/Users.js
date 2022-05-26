const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');

const register = router.post('/register', async (req, res) => {
    let { fname, lname, username, password, email } = req.body;
    db.pool.query(`INSERT INTO 
                    users(fname, lname, username, password, email) 
                    VALUES ('${fname}', '${lname}', '${username}', '${password}', '${email}')`)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `inserted ${result} column.`});
    })
    .catch( err => {
        console.log(err);
        res.status(400).send({message: `There's been an error!`});
    })
});

const login = router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    db.pool.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`)
    .then( data => {
        let resultsAmount = data.rowCount;
        if (resultsAmount > 0){
            let user = data.rows[0];
            res.status(200).send({
                id: `${user.id}`,
                fname: `${user.fname}`,
                lname: `${user.lname}`
            });
        }
        else{
            res.status(404).send({message: `No users found.`});
        }
    })
});

module.exports = { register, login }