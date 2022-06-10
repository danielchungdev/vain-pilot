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

const addSubject = router.post('/subjects', (req, res) => {
    let { typeid, typedescription } = req.body;
    if (typeid !== undefined && typedescription !== undefined){
        let params = [typeid, typedescription];
        let query = `INSERT INTO type (typeid, typedescription) VALUES ($1, $2)`;
        db.pool.query(query, params)
        .then( data => {
            let result = data.rowCount;
            res.status(200).send({message: `inserted ${result} column.`});
        })
        .catch(err => {
            res.status(409).send({message: "There's a duplicate key."});
        }) ;
    }
    else{
        res.status(400).send({message: "Empty body."});
    }
});

const deleteType = router.delete('/types/:typeid', (req, res) => {

});

const updateType = router.put('/types', (req, res) => {

});

module.exports = { getAllTypes, getTypeById, addSubject };