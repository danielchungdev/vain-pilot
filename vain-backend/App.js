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

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const port = process.env.PORT || 5000;
const app = express();
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
app.use(cors());

const db = require('./config/DBConnection');
const e = require('express');

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
    res.status(200).send('Hello world!');
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
app.get('/subjects', (req, res) => {
    db.pool.query(`SELECT * FROM subject`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No subjects found."}');
        }
    });
});

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
app.get('/types', (req, res) => {
    db.pool.query(`SELECT * FROM type`)
    .then( data => {
        let result = data.rows;
        if(result.length > 0){
            res.status(200).send(result)
        }
        else{
            res.status(404).send('{message: "No types found."}')
        }
    });
});

/**
 * @swagger 
 * /namedpersons:
 *  get:
 *      description: "This route gets all the named persons from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the namedpersons.
 *          '404':
 *              description: No types found.
 */
app.get('/namedpersons', (req, res) => {
    db.pool.query(`SELECT * FROM namedperson`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No namedpersons saw"}')
        }
    })
});

/**
 * @swagger 
 * /publisher:
 *  get:
 *      description: "This route gets all the publishers from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the publishers.
 *          '404':
 *              description: No publishers found.
 */
app.get('/publishers', (req, res) => {
    db.pool.query(`SELECT * FROM publisher`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No publishers found"}');
        }
    })
});

/**
 * @swagger 
 * /types:
 *  get:
 *      description: "This route gets all the types from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the types.
 *          '404':
 *              description: No types found.
 */
app.get('/types', (req, res) => {
    db.pool.query(`SELECT * FROM type`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No types found"}');
        }
    })
});

/**
 * @swagger 
 * /subjects:
 *  get:
 *      description: "This route gets all the subjects from the database."
 *      responses:
 *          '200':
 *              description: Successfully found and return the subjects.
 *          '404':
 *              description: No subjects found.
 */
app.get('/subjects', (req, res) => {
    db.pool.query(`SELECT * FROM subject`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result);
        }
        else{
            res.status(404).send('{message: "No subjects found"}');
        }
    })
});

app.get('/books', (req, res) => {
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

app.get('/title/:bookid', (req, res) => {
    let bookid = parseInt(req.params.bookid);
    db.pool.query(`SELECT * FROM title WHERE titleid = ${bookid}`)
    .then( data => {
        let result = data.rows;
        if (result.length > 0){
            res.status(200).send(result[0]);
        }
        else{
            res.status(404).send('{message: "No subjects found"}');
        }
    });
});



app.listen(port, () => {
    console.log(`Vain Backend is running on ${port}`);
});