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
					author.bookid, namedperson.fname, namedperson.lname, namedperson.nobilitytitle, title.titlestring as title, bookedition.year
                    FROM author
                    LEFT JOIN bookedition ON author.bookid = bookedition.bookid
                    LEFT JOIN title on bookedition.titleid = title.titleid
					LEFT JOIN namedperson ON author.namedpersonid = namedperson.namedpersonid`)
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

const insertBookEdition = router.post('/books', async (req, res) => {
    let { bookSubject, bookType, bookAuthor, 
        authNobility, authFname, authLname, 
        authLifeyears, bookTitle, bookEdition,
        bookVolumes, bookPages, bookFormat, 
        bookDescription, bookPublisher, publishername,
        publisherLocation
    } = req.body;
    //An author was selected.
    console.log(req.body)
    let authorid;
    let publisherid;  
    let titleid; 
    let bookid;
    if(authFname === ''){
        authorid = bookAuthor.id;        
    }
    else{
        //Should probably add if the author already exists.
        //Should check before this and then return error.
        let query = `INSERT INTO namedperson 
                        (fname, lname, nobilitytitle, lifeyears)
                    VALUES ($1, $2, $3, $4)
                    RETURNING namedpersonid`
        await db.pool.query(query, [authFname, authLname, authNobility, authLifeyears]) 
        .then( data => {
            authorid = data.rows[0].namedpersonid;
        })
    }
    //Should probably add if the publisher already exists.
    //Should check before this and then return error.
    if(publishername === ''){
        publisherid = bookPublisher.publisherid; 
    }
    else {
        let query = `INSERT INTO publisher 
                        (publishername, publisherlocation)
                    VALUES ($1, $2)
                    RETURNING publisherid
                    ` 
        await db.pool.query(query, [publishername, publisherLocation])
        .then( data => {
            publisherid = data.rows[0].publisherid;
        })
    }
    let titleQuery = `INSERT INTO title (titlestring) VALUES ($1) RETURNING titleid`; 
    await db.pool.query(titleQuery, [bookTitle]) 
    .then( data => {
        titleid = data.rows[0].titleid;
    })
    let insertBookQuery = `INSERT INTO book (bookdescriptor, booknote) VALUES ($1, $2) RETURNING bookid` 
    await db.pool.query(insertBookQuery, [bookDescription, ""])
    .then( data => {
        bookid = data.rows[0].bookid;
    })
    let insertAuthorQuery = `INSERT INTO author (namedpersonid, bookid) VALUES ($1, $2)`
    await db.pool.query(insertAuthorQuery, [authorid, bookid])
    .then(console.log('inserted data.'))
    //let bookEditionQuery = `INSERT INTO bookedition 
    //                        (bookid, editionid, publisherid, titleid, )`   
    console.log('This is the title id: ' + titleid)
    console.log('This is an author id: ' + authorid)
    console.log('This is a publishers id: ' + publisherid)
    console.log('This is the book id:  ' + bookid)
});

const getBookById = router.get('/books/:bookid', async (req, res) => {
	const bookid = parseInt(req.params.bookid)
    db.pool.query(`SELECT * FROM bookedition WHERE bookid = ${bookid}`)
	.then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send(`{message: "No book with id: ${bookid} found"}`);
        }
    });
})

module.exports = { getAllBooks, getAllBooksDescriptive, insertBookEdition, getBookById };