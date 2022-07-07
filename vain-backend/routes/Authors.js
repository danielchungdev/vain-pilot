/**
 * @TODO add documentation
 */

 const express = require('express');
 const router = express.Router();
 const db = require('../config/DBConnection');

const getBookAuthor = router.get('/authors/:bookid', (req, res) => {
    let bookid = req.params.bookid; 
    db.pool.query(`SELECT namedperson.namedpersonid, namedperson.fname, namedperson.lname FROM namedperson LEFT JOIN author ON namedperson.namedpersonid = author.namedpersonid WHERE bookid = ${bookid}`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No authors found"}');
        }
    });
});

 module.exports = { getBookAuthor };