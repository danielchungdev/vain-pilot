const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');

const getAllPublishers = router.get('/publishers', (req, res) => {
    db.pool.query(`SELECT * FROM publisher`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No publishers found"}');
        }
    });
});

const getPublisherById = router.get('/publishers/:publisherid', (req, res) => {
    let publisherid = parseInt(req.params.publisherid);
    db.pool.query(`SELECT * FROM publisher WHERE publisherid = ${publisherid}`)
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

module.exports = { getAllPublishers, getPublisherById };