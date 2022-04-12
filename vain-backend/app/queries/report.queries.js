const db = require('../config/db.config');
const pool = db.pool;

const getBooksGroupByYear = (req, res) => {
    pool.query(`SELECT COUNT(*), year FROM book GROUP BY year`)
    .then(bookData => {
        res.send(bookData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBooksGroupByType = (req, res) => {
    pool.query(`SELECT COUNT(*), type FROM type_book INNER JOIN book on (type_book.book_id = book.book_id) INNER JOIN type on (type_book.type_id = type.type_id)  GROUP BY type`)
    .then(booksData => {
        res.send(booksData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBooksGroupBySubject = (req, res) => {
    pool.query(`SELECT COUNT(*), subject.subject FROM subject_book INNER JOIN book on (subject_book.book_id = book.book_id) INNER JOIN subject on (subject_book.subject_id = subject.subject_id) GROUP BY subject`)
    .then(booksData => {
        res.send(booksData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getBooksGroupByAuthorship = (req, res) => {
    pool.query(`SELECT COUNT(*), authorship FROM book GROUP BY authorship`)
    .then(booksData => {
        res.send(booksData.rows);
    })
    .catch(e => console.error(e.stack));
}

// other report ideas:
// publisher counts
// subject counts

module.exports = {
    getBooksGroupByYear,
    getBooksGroupByType,
    getBooksGroupBySubject,
    getBooksGroupByAuthorship

}