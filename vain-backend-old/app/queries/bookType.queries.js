const db = require('../config/db.config');
const pool = db.pool;
const table = "type_book";

const getAllBookTypes = (req, res) => {
    pool.query(`SELECT * FROM ${table}`)
    .then(bookTypeData => {
        res.send(bookTypeData.rows);
    })
    .catch(e => console.error(e.stack));
}

const addNewBookType = (req, res) => {
    // specify json for body values
    const { book_id, type_id } = req.body;
    pool.query(`INSERT INTO ${table} (type_id, book_id) VALUES ($1, $2)`, [type_id, book_id])
    .then(bookTypeData => {
        res.send(bookTypeData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getAllBooksWithType = (req, res) => {
    pool.query(`SELECT * FROM ${table} INNER JOIN book on (${table}.book_id = book.book_id) WHERE type_id = $1`, [req.params.type])
    .then(booksData => {
        res.send(booksData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getTypesForBook = (req, res) => {
    pool.query(`SELECT * FROM ${table} WHERE book_id = $1`, [req.params.id])
    .then(booksData => {
        res.send(booksData.rows);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
    getAllBookTypes,
    addNewBookType,
    getAllBooksWithType,
    getTypesForBook
}