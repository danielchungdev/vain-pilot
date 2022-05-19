const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');

const getAllTitles = router.get('/titles', (req, res) => {
    db.pool.query(`SELECT * FROM title`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No titles found"}');
        }
    });
});

const getTitleById = router.get('/titles/:bookid', (req, res) => {
    let bookid = parseInt(req.params.bookid);
    if (bookid === NaN){
        res.status(400).send('Invalid request.')
    }
    db.pool.query(`SELECT * FROM title WHERE titleid = ${bookid}`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result[0]);
        }
        else{
            res.status(404).send('{message: "No subjects found"}');
        }
    });
});

module.exports = { getAllTitles, getTitleById };