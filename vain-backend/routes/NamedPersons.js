const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');

const getAllNamedPersons = router.get('/namedpersons', (req, res) => {
    db.pool.query(`SELECT * FROM namedperson`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No namedpersons saw"}')
        }
    });
});

const getAllNamedPersonsById = router.get('/namedpersons/:namedpersonid', (req, res) => {
    let namedpersonid = parseInt(req.params.namedpersonid);
    db.pool.query(`SELECT * FROM namedperson WHERE namedpersonid = ${namedpersonid}`)
    .then( data => {
        let result = data.rows;
        if(result.length > 0){
            res.status(200).send(result[0])
        }
        else{
            res.status(404).send('{message: "No namedperson found."}')
        }
    });
});

module.exports = { getAllNamedPersons, getAllNamedPersonsById };