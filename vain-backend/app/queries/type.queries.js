const db = require('../config/db.config');
const pool = db.pool;

const getAllTypes = (req, res) => {
    pool.query('SELECT * FROM type')
    .then(typeData => {
        res.send(typeData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getTypeById = (req, res) => {
    pool.query('SELECT * FROM type WHERE type_id = $1', [req.params.id])
    .then(typesData => {
        res.send(typesData.rows);
    })
    .catch(e => console.error(e.stack));
}

const addNewType = (req, res) => {
    const { id, type } = req.body;
    pool.query('INSERT INTO type (type_id, type) VALUES ($1, $2) RETURNING type_id', [id, type])
    .then(() => {
        res.send(`New type added with type_id: ${id}`);
    })
    .catch(e => console.error(e));
}

const updateTypeById = (req, res) => {
    const { type } = req.body;
    pool.query('UPDATE type SET type = $1 WHERE type_id = $2', [type, req.params.id])
    .then(() => {
        res.send(`Type updated with type_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

const deleteType = (req, res) => {
    pool.query('DELETE FROM type WHERE type_id = $1', [req.params.id])
    .then(() => {
        res.send(`Type deleted with type_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
    getAllTypes,
    getTypeById,
    addNewType,
    updateTypeById,
    deleteType,
}