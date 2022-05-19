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
    db.pool.query(`SELECT * FROM type WHERE typeid = '${subjectid}'`)
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

module.exports = { getAllSubjects, getSubjectById };