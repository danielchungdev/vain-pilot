/**
 * @TODO add documentation
 */

const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');
const createQuery = require('../utils/utilities.js');

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

/**
 * @TODO Verify duplicates.
 */
const addNamedPerson = router.post('/namedpersons', (req, res) => {
    let = {fname, lname, nobilitytitle, lifeyears, personnote} = req.body;
    let query = `INSERT INTO namedperson(fname, lname, nobilitytitle, lifeyears, personnote) VALUES ($1, $2, $3, $4, $5)`;
    let params = [fname, lname, nobilitytitle, lifeyears, personnote];
    db.pool.query(query, params)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `inserted ${result} column.`});
    })
});

const deleteNamedPerson = router.delete('/namedpersons/:namedpersonid', (req, res) => {
    let namedpersonid = req.params.namedpersonid; //This is a number
    db.pool.query(`DELETE FROM namedperson WHERE namedpersonid = ${namedpersonid}`)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `Deleted ${result} column.`});
    });
});

const updateNamedPerson = router.put('/namedpersons/:namedpersonid', (req, res) => {
    let neededObject = createQuery("namedperson", req.body)
    console.log(neededObject);
    db.pool.query(neededObject.query, neededObject.values)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `Updated ${result} column`});
    });
});

module.exports = { 
    getAllNamedPersons, getAllNamedPersonsById, addNamedPerson, 
    deleteNamedPerson,  updateNamedPerson
};
