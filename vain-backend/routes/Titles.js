const express = require('express');
const router = express.Router();
const db = require('../config/DBConnection');

const getAllTitles = router.get('/titles', (req, res) => {
    db.pool.query(`SELECT * FROM title`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No titles found"}');
        }
    });
});

const getTitleById = router.get('/titles/:bookid', (req, res) => {
    let bookid = parseInt(req.params.bookid);
    if (bookid === NaN){
        res.status(400).send('Invalid request.')
    }
    db.pool.query(`SELECT * FROM title WHERE titleid = ${bookid}`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result[0]);
        }
        else{
            res.status(404).send('{message: "No titles found"}');
        }
    });
});

const addTitle = router.post('/titles', (req, res) => {
    let {titlestring} = req.body;
    let query = `INSERT INTO title (titlestring) VALUES ($1)`
    db.pool.query(query, [titlestring])
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `Inserted ${result} column.`});
    });
});

const deleteTitle = router.delete('/titles/:titleid', (req, res) => {
    let titleid = req.params.titleid;
    let query = `DELETE FROM title WHERE titleid = $1`;
    let params = [titleid]
    db.pool.query(query, params)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `Deleted ${result} column.`});
    })
});

const updateTitle = router.put('/titles/:titleid', (req, res) => {
    let titleid = req.params.titleid;
    let query = `UPDATE title SET titlestring = $1 WHERE titleid = $2`;
    let params = [req.body.titlestring, titleid]
    db.pool.query(query, params)
    .then( data => {
        let result = data.rowCount;
        res.status(200).send({message: `Updated ${result} column`});
    });
});

module.exports = { getAllTitles, getTitleById, addTitle, deleteTitle, updateTitle };