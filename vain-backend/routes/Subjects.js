const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');

const getAllSubjects = router.get('/subjects', (req, res) => {
    db.pool.query(`SELECT * FROM subject`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No subjects found."}');
        }
    });
});

const getSubjectById = router.get('/subjects/:subjectid', (req, res) => {
    let subjectid = req.params.subjectid.toLowerCase();
    db.pool.query(`SELECT * FROM subject WHERE subjectid = '${subjectid}'`)
    .then( data => {
        let result = data.rows;
        if(result.length > 0){
            res.status(200).send(result[0]);
        }
        else{
            res.status(404).send('{message: "No subject found."}');
        }
    });
});

const addSubject = router.post('/subjects', (req, res) => {
    let { subjectid, subjectdescription } = req.body;
    if (subjectid !== undefined && subjectdescription !== undefined){
        let params = [subjectid, subjectdescription];
        let query = `INSERT INTO subject (subjectid, subjectdescription) VALUES ($1, $2)`;
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

const deleteSubject = router.delete('/subjects/:subjectid', (req, res) => {
    let subjectid = req.params.subjectid.toLowerCase();
    db.pool.query(`DELETE FROM subject WHERE subjectid = '${subjectid}'`)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `Deleted ${result} column.`});
    });
});

const updateSubject = router.put('/subjects', (req, res) => {
    let {subjectid, subjectdescription} = req.body;
    db.pool.query(`UPDATE subject SET subjectdescription = '${subjectdescription}' WHERE subjectid = '${subjectid}'`)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `Updated ${result} column`});
    });
});

module.exports = { 
    getAllSubjects, getSubjectById, addSubject, 
    deleteSubject, updateSubject 
};