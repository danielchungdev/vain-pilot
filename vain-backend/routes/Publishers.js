const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');
const utilities = require('../utils/utilities.js');

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

const addPublisher = router.post('/publishers', (req, res) => {
    let {publishername, publisherlocation, publishertype} = req.body;
    let query = `INSERT INTO publisher (publishername, publisherlocation, publishertype) VALUES ($1, $2, $3)`;
    let params = [publishername, publisherlocation, publishertype];
    db.pool.query(query, params)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `inserted ${result} column.`});
    })
    .catch(err => {
        res.status(409).send({message: "There's a duplicate key."});
    }) ;
});

const deletePublisher = router.delete('/publishers/:publisherid', (req, res) => {
    let publisherid = req.params.publisherid; // This is a number
    db.pool.query(`DELETE FROM publisher WHERE publisherid = ${publisherid}`)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `Deleted ${result} column.`});
    })
});

const updatePublisher = router.put('/publishers/:publisherid', (req, res) => {
    let publisherid = req.params.publisherid;
    let neededObject = utilities.createQuery("publisher", req.body)
    db.pool.query(neededObject.query + ` WHERE publisherid = ${publisherid}`, neededObject.values)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `Updated ${result} column`});
    });
});

module.exports = {
    getAllPublishers, getPublisherById, addPublisher, 
    deletePublisher, updatePublisher
};