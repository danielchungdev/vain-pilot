const db = require('../config/db.config');
const pool = db.pool;

const getAllBooks = (req, res) => {
    pool.query('SELECT * FROM book')
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBookById = (req, res) => {
    pool.query('SELECT * FROM book WHERE book_id = $1', [req.params.id])
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBookSubjectById = (req, res) => {
    pool.query('SELECT subject FROM book WHERE book_id = $1', [req.params.id])
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBookTypeById = (req, res) => {
    pool.query('SELECT type FROM book WHERE book_id = $1', [req.params.id])
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBookAuthorById = (req, res) => {
    pool.query('SELECT author FROM book WHERE book_id = $1', [req.params.id])
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBookPublisherById = (req, res) => {
    pool.query('SELECT publisher FROM book WHERE book_id = $1', [req.params.id])
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}


const addNewBook = (req, res) => {
    const { authorship, title, year, description, namedpersons, notes, located, modifiedby, lastupdated } = req.body;
    console.log(req.body);
    pool.query('INSERT INTO book (authorship, title, year, description, namedpersons, notes, located, modifiedby, lastupdated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING book_id', [authorship, title, year, description, namedpersons, notes, located, modifiedby, lastupdated])
    .then(bookData => {
        res.send(bookData);
    })
    .catch(e => console.error(e));
}

const updateBook = (req, res) => {
    const { authorship, title, year, description, namedpersons, notes, located, modifiedby, lastupdated } = req.body;
}

const deleteBook = (req, res) => {
    pool.query('DELETE FROM book WHERE book_id = $1', [req.params.id])
    .then(() => {
        res.send(`Book deleted with book_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

const getBooksByYear = (req, res) => {
    pool.query('SELECT * FROM book WHERE year = $1', [req.params.year])
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBooksByYearRange = (req, res) => {
    pool.query('SELECT * FROM book JOIN type_book USING(book_id) JOIN type USING(type_id) WHERE type_id = $1', [req.params.type])
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

// Trying to figure out how to dynamically create SQL for the filters
const getFilteredTypeBooks = (req, res) => {
    
    pool.query('SELECT * FROM book JOIN type_book USING(book_id) JOIN type USING(type_id) WHERE type_id = $1', [req.params.type])
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getFilteredGenreBooks = (req, res) => {
    
    pool.query('SELECT * FROM book JOIN subject_book USING(book_id) JOIN subject USING(subject_id) WHERE subject_id = $1', [req.params.genre])
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBookYears = (req, res) => {
    
    pool.query('SELECT COUNT(*), year FROM book GROUP BY year ORDER BY year ASC')
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
    getAllBooks,
    getBookById,
    addNewBook,
    deleteBook,
    getBooksByYear,
    getBooksByYearRange,
    getFilteredTypeBooks,
    getFilteredGenreBooks,
    getBookYears,
    updateBook,
    getBookSubjectById,
    getBookTypeById,
    getBookAuthorById,
    getBookPublisherById
}