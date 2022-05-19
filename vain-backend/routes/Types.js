const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');

const getAllTypes = router.get('/types', (req, res) => {
    db.pool.query(`SELECT * FROM type`)
    .then( data => {
        let result = data.rows;
        if(result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No types found."}');
        }
    });
});

const getTypeById = router.get('/types/:typeid', (req, res) => {
    let typeid = req.params.typeid.toLowerCase();
    db.pool.query(`SELECT * FROM type WHERE typeid = '${typeid}'`)
    .then( data => {
        let result = data.rows;
        if(result.length > 0){
            res.status(200).send(result[0]);
        }
        else{
            res.status(404).send('{message: "No types found."}');
        }
    });
});

module.exports = { getAllTypes, getTypeById };