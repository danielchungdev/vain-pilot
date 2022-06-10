/**
   ___               _     
 / _ \             (_)    
/ /_\ \_ __  _ __   _ ___ 
|  _  | '_ \| '_ \ | / __|
| | | | |_) | |_) || \__ \
\_| |_/ .__/| .__(_) |___/
      | |   | |   _/ |    
      |_|   |_|  |__/     
 */

/**
 * @description System imports
 */
require('dotenv').config();

/**
 * @description Express imports & Constants.
 */
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser'); 
// app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(bodyParser.json()); 

/**
 * @description SwaggerUI documentation imports and options.
 */
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Vain API',
            description: 'API documentation for the Vain Backend',
            contact: {
                name: 'Daniel Chung'
            }
        },
        servers: ['https://localhost:8080']
    },
    apis: ['App.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @description Importing routes
 */
const subjects = require('./routes/Subjects');
const types = require('./routes/Types');
const namedpersons = require('./routes/NamedPersons');
const publishers = require('./routes/Publishers');
const books = require('./routes/Books');
const titles = require('./routes/Titles');
const users = require('./routes/Users');

/**
 * @swagger 
 * /:
 *  get:
 *      description: "Testing route."
 *      responses:
 *          '200':
 *              description: Successfully running backend
 */
app.get('/', (req, res) => {
    res.status(200).send('Documentation found in ~/api-docs/');
});

/**
 * @swagger 
 * /subjects:
 *  get:
 *      description: "This route gets all the subjects from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the items.
 *          '404':
 *              description: No subjects found.
 */
app.get('/subjects', subjects.getAllSubjects);

/**
 * @swagger 
 * /subjects/{subjectid}:
 *  get:
 *      parameters: 
 *          - in: path
 *            name: subjectid
 *            required: true
 *            schema: 
 *              type: string
 *            description: The subject's id.
 *      description: "Gets a subject by id."
 *      responses:
 *          '200':
 *              description: Successfully found and return the subject.
 *          '404':
 *              description: No subjects found.
 */
app.get('/subjects/:subjectid', subjects.getSubjectById);

/**
 * @TODO write swagger documentation
 */
app.post('/subjects', subjects.addSubject);

/**
 * @TODO write swagger documentation
 */
app.delete('/subjects/:subjectid', subjects.deleteSubject);

/**
 * @TODO write swagger documentation
 */
app.put('/subjects', subjects.updateSubject);

/**
 * @swagger 
 * /types:
 *  get:
 *      description: "This route gets all the types from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the items.
 *          '404':
 *              description: No types found.
 */
app.get('/types', types.getAllTypes);

/**
 * @swagger 
 * /types/{typeid}:
 *  get:
 *      parameters: 
 *          - in: path
 *            name: typeid
 *            required: true
 *            schema: 
 *              type: string
 *            description: The type's id.
 *      description: "Gets a type by id."
 *      responses:
 *          '200':
 *              description: Successfully found and return the type.
 *          '404':
 *              description: No books types.
 */
app.get('/types/:typeid', types.getTypeById);

/**
 * @TODO write swagger documentation
 */
app.post('/types', types.addType);

/**
 * @TODO write swagger documentation
 */
app.delete('/types/:typeid', types.deleteType);

/**
 * @TODO write swagger documentation
 */
app.put('/types', types.updateType);

/**
 * @swagger 
 * /namedpersons:
 *  get:
 *      description: "This route gets all the named persons from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the namedpersons.
 *          '404':
 *              description: No namedpersons found.
 */
app.get('/namedpersons', namedpersons.getAllNamedPersons);

app.get('/namedpersons/:namedpersonid', namedpersons.getAllNamedPersonsById);

/**
 * @swagger 
 * /publishers:
 *  get:
 *      description: "This route gets all the publishers from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the publishers.
 *          '404':
 *              description: No publishers found.
 */
app.get('/publishers', publishers.getAllPublishers);

/**
 * @swagger 
 * /publishers/{publishersid}:
 *  get:
 *      parameters: 
 *          - in: path
 *            name: publishersid
 *            required: true
 *            schema: 
 *              type: integer
 *            description: The publisher's id.
 *      description: "Gets a publisher by id."
 *      responses:
 *          '200':
 *              description: Successfully found and return the publisher.
 *          '404':
 *              description: No books found.
 */
app.get('/publishers/:publisherid', publishers.getPublisherById);

/**
 * @swagger 
 * /books:
 *  get:
 *      description: "This route gets all the books from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the books.
 *          '404':
 *              description: No books found.
 */
app.get('/books', books.getAllBooks);

/**
 * @swagger 
 * /books/descriptive:
 *  get:
 *      description: "This route gets all the books with descriptions from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the books.
 *          '404':
 *              description: No books found.
 */
app.get('/books/descriptive', books.getAllBooksDescriptive);

/**
 * @swagger 
 * /titles:
 *  get:
 *      description: "This route gets all the titles from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the titles.
 *          '404':
 *              description: No titles found.
 */
app.get('/titles', titles.getAllTitles);

/**
 * @swagger 
 * /title/{bookid}:
 *  get:
 *      parameters: 
 *          - in: path
 *            name: bookid
 *            required: true
 *            schema: 
 *              type: integer
 *            description: The book's id.
 *      description: "Gets the book by id."
 *      responses:
 *          '200':
 *              description: Successfully found and return the book.
 *          '404':
 *              description: No books found.
 */
app.get('/titles/:bookid', titles.getTitleById);

/**
 * @TODO Add SwaggerUI documentation
 */
app.post('/register', users.register);

/**
 * @TODO Add SwaggerUI documentation
 */
app.post('/login', users.login);

app.listen(port, () => {
    console.log(`Vain Backend is running on ${port}`);
});
