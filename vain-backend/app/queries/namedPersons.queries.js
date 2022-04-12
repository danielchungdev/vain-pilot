const db = require('../config/db.config');
const table = "namedpersons";

const getAllNamedPersons = (req, res) => {
    db.pool.query(`SELECT * FROM ${table}`)
    .then(genreData => {
        res.send(genreData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getNamedPersonByAuthorId = (req, res) => {
    db.pool.query(`SELECT * FROM ${table} WHERE author_id = $1`, [req.params.id])
    .then(genreData => {
        res.send(genreData.rows);
    })
    .catch(e => console.error(e.stack));
}

const addNewNamedPerson = (req, res) => {
    // specify json for body values
    const { id, name, lifeyears } = req.body;
    db.pool.query(`INSERT INTO ${table} (author_id, name, lifeyears) VALUES ($1, $2, $3)`, [id, name, lifeyears])
    .then(genreData => {
        res.send(`New Namedperson added with author_id: ${id}`);
    })
    .catch(e => console.error(e.stack));
}

const updateNamedPersonByAuthorId = (req, res) => {
    const { name, lifeyears } = req.body;
    db.pool.query(`UPDATE ${table} SET name = $1, lifeyears = $2 WHERE author_id = $3`, [name, lifeyears, req.params.id])
    .then(() => {
        res.send(`Namedperson updated with author_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

const deleteNamedPerson = (req, res) => {
    db.pool.query(`DELETE FROM ${table} WHERE author_id = $1`, [req.params.id])
    .then(() => {
        res.send(`Namedperson deleted with author_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
    getAllNamedPersons,
    getNamedPersonByAuthorId,
    addNewNamedPerson,
    updateNamedPersonByAuthorId,
    deleteNamedPerson,
}