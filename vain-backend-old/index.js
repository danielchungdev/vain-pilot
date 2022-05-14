const express = require('express');
const cors = require('cors');
const { body, param } = require('express-validator');
//updatetest
const app = express();

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something is wrong!')
  })
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;
//yes
// calls to query files
const subjects = require('./app/queries/subject.queries');
const roles = require('./app/queries/role.queries');
const types = require('./app/queries/type.queries');
const publishers = require('./app/queries/publisher.queries');
const users = require('./app/queries/user.queries');
const books = require('./app/queries/book.queries');
const bookAuthors = require('./app/queries/bookAuthor.queries');
const bookPublishers = require('./app/queries/bookPublisher.queries');
const namedPersons = require('./app/queries/namedPersons.queries');
const bookSubjects = require('./app/queries/bookSubject.queries');
const bookTypes = require('./app/queries/bookType.queries');
const reports = require('./app/queries/report.queries');

// login path
app.post('/login', users.attemptLogin); // add validations in a bit lol

// users paths
app.get('/users', users.getAllUsers);
app.get('/users/:id', users.getUserById);
app.post('/users',
  body('id').not().isEmpty().trim().escape(),
  body('fname').not().isEmpty().trim().escape(),
  body('lname').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  users.addNewUser
);
app.put('/users/:id',
  param('id'),
  body('fname').not().isEmpty().trim().escape(),
  body('lname').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  users.updateUserById
);
app.delete('/users/:id', users.deleteUser);


// roles paths
app.get('/roles', roles.getAllRoles);
app.get('/roles/:id', roles.getRoleById);
app.post('/roles',
  body('id').not().isEmpty().trim().escape(),
  body('role').not().isEmpty().trim().escape(),
  roles.addNewRole
);
app.put('/roles/:id',
  param('id').not().isEmpty().trim().escape(),
  body('role').not().isEmpty().trim().escape(),
  roles.updateRoleByid
);
app.delete('/roles/:id', roles.deleteRole);


// subjects paths
app.get('/subjects', subjects.getAllSubjects);
app.get('/subjects/:id', subjects.getSubjectById);
app.post('/subjects',
  body('id').not().isEmpty().trim().escape(),
  body('subject').not().isEmpty().trim().escape(),
  subjects.addNewSubject
);
app.put('/subjects/:id',
  param('id').not().isEmpty().trim().escape(),
  body('subject').not().isEmpty().trim().escape(),
  subjects.updateSubjectById
);
app.delete('/subjects/:id', subjects.deleteSubject);


// publishers paths
app.get('/publishers', publishers.getAllPublishers);
app.get('/publishers/:id', publishers.getPublisherById);
app.post('/publishers',
  body('location').not().isEmpty().trim().escape(),
  body('publisher').not().isEmpty().trim().escape(),
  publishers.addNewPublisher
);
app.put('/publishers/:id',
  param('id').not().isEmpty().trim().escape(),
  body('location').not().isEmpty().trim().escape(),
  body('publisher').not().isEmpty().trim().escape(),
  publishers.updatePublisherById
);
app.delete('/publishers/:id', publishers.deletePublisher);


// namedpersons paths
app.get('/namedpersons', namedPersons.getAllNamedPersons);
app.get('/namedpersons/:id', namedPersons.getNamedPersonByAuthorId);
app.post('/namedpersons',
  body('id').not().isEmpty().trim().escape(),
  body('name').not().isEmpty().trim().escape(),
  body('lifeyears').not().isEmpty().trim().escape(),
  namedPersons.addNewNamedPerson
);
app.put('/namedpersons/:id',
  param('id').not().isEmpty().trim().escape(),
  body('name').not().isEmpty().trim().escape(),
  body('lifeyears').not().isEmpty().trim().escape(),
  namedPersons.updateNamedPersonByAuthorId
);
app.delete('/namedpersons/:id', namedPersons.deleteNamedPerson);


// types paths
app.get('/types', types.getAllTypes);
app.get('/types/:id', types.getTypeById);
app.post('/types',
  body('id').not().isEmpty().trim().escape(),
  body('type').not().isEmpty().trim().escape(),
  types.addNewType
);
app.put('/types/:id',
  param('id').not().isEmpty().trim().escape(),
  body('type').not().isEmpty().trim().escape(),
  types.updateTypeById
);
app.delete('/types/:id', types.deleteType);


// books paths
app.get('/books', books.getAllBooks);
app.get('/books/book/:id', books.getBookById);
app.get('/books/years/:year', books.getBooksByYear);
app.get('/books/book/type/:type', books.getFilteredTypeBooks);
app.get('/books/book/genre/:genre', books.getFilteredGenreBooks);
app.get('/books/year', books.getBookYears);
app.post('/books',
  body('authorship').not().isEmpty().trim().escape(),
  body('title').not().isEmpty().trim().escape(),
  body('year').isInt().custom(value => { if (value <= 0 || value > 9999) { return false; } return true; }),
  body('description').not().isEmpty().trim().escape(),
  body('namedpersons').not().isEmpty().trim().escape(),
  body('notes').not().isEmpty().trim().escape(),
  body('located').not().isEmpty().trim().escape(),
  body('modifiedby').not().isEmpty().trim().escape(),
  body('lastupdated').not().isEmpty().trim().escape(),
  books.addNewBook
);
// put
app.put('/books/:id', books.updateBook);
app.delete('/books/book/:id', books.deleteBook);


// book authors paths
app.get('/bookAuthors', bookAuthors.getAllBookAuthors);
app.post('/bookAuthors',
  body('book_id').not().isEmpty().trim().escape(),
  body('author_id').not().isEmpty().trim().escape(),
  bookAuthors.addNewBookAuthors
);
app.get('/bookAuthors/book/:author', bookAuthors.getAllBooksWithAuthor);


// book publishers paths
app.get('/bookPublishers', bookPublishers.getAllBookPublishers);
app.post('/bookPublishers',
  body('book_id').not().isEmpty().trim().escape(),
  body('publisher_id').not().isEmpty().trim().escape(),
  bookPublishers.addNewBookPublishers
);
app.get('/bookPublishers/book/:publisher', bookPublishers.getAllBooksWithPublisher);


// book types paths
app.get('/bookTypes', bookTypes.getAllBookTypes);
app.post('/bookTypes',
  body('book_id').not().isEmpty().trim().escape(),
  body('type_id').not().isEmpty().trim().escape(),
  bookTypes.addNewBookType
);
app.get('/bookTypes/book/:type', bookTypes.getAllBooksWithType);
app.get('/bookTypes/:id', bookTypes.getTypesForBook);


// book subjects paths
app.get('/bookSubjects', bookSubjects.getAllBookSubjects);
app.post('/bookSubjects',
  body('subject_id').not().isEmpty().trim().escape(),
  body('book_id').not().isEmpty().trim().escape(),
  bookSubjects.addNewBookSubject
);
app.get('/bookSubjects/book/:subject', bookSubjects.getAllBooksWithSubject);


// queries for reports
app.get('/reports/year', reports.getBooksGroupByYear);
app.get('/reports/type', reports.getBooksGroupByType);
app.get('/reports/subject', reports.getBooksGroupBySubject);
app.get('/reports/authorship', reports. getBooksGroupByAuthorship);

app.listen(port, () => {
    console.log(`vain backend app is running on port ${port}`);
});

