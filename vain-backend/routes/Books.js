const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');

const getAllBooks = router.get('/books', (req, res) => {
    db.pool.query(`SELECT * FROM bookedition`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No subjects found"}');
        }
    });
});

/**
 * @description Temp implementation.
 * @TODO This one will be incomplete until all fields are filled. 
 */
const getAllBooksDescriptive = router.get('/books/descriptive', (req, res) => {
    db.pool.query(`SELECT 
                    bookid as id, titleString as title, publishername, publisherlocation
                    FROM bookedition
                    LEFT JOIN title ON bookedition.titleid = title.titleid
                    LEFT JOIN publisher ON bookedition.publisherid = publisher.publisherid`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No subjects found"}');
        }
    });
});

module.exports = { getAllBooks, getAllBooksDescriptive};