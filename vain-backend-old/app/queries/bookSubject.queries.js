const db = require('../config/db.config');
const pool = db.pool;
const table = "subject_book";

const getAllBookSubjects = (req, res) => {
    pool.query(`SELECT * FROM ${table}`)
    .then(bookSubjectData => {
        res.send(bookSubjectData.rows);
    })
    .catch(e => console.error(e.stack));
}

const addNewBookSubject = (req, res) => {
    // specify json for body values
    const { book_id, subject_id } = req.body;
    pool.query(`INSERT INTO ${table} (subject_id, book_id) VALUES ($1, $2)`, [subject_id, book_id])
    .then(bookSubjectData => {
        res.send(bookSubjectData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getAllBooksWithSubject = (req, res) => {
    pool.query(`SELECT * FROM ${table} INNER JOIN book on (${table}.book_id = book.book_id) WHERE subject_id = $1`, [req.params.subject])
    .then(booksData => {
        res.send(booksData.rows);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
    getAllBookSubjects,
    addNewBookSubject,
    getAllBooksWithSubject
}