const db = require('../config/db.config');
const pool = db.pool;

const getAllPublishers = (req, res) => {
    pool.query('SELECT * FROM publisher')
    .then(publisherData => {
        res.send(publisherData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getPublisherById = (req, res) => {
    pool.query('SELECT * FROM publisher WHERE publisher_id = $1', [req.params.id])
    .then(publisherData => {
        res.send(publisherData.rows);
    })
    .catch(e => console.error(e.stack));
}

const addNewPublisher = (req, res) => {
    // specify json for body values
    const { publisher, location } = req.body;
    pool.query('INSERT INTO publisher (publisher, publisherLocation) VALUES ($1, $2)', [publisher, location])
    .then(publisherData => {
        res.send(publisherData.rows);
    })
    .catch(e => console.error(e.stack));
}

const updatePublisherById = (req, res) => {
    const { publisher, location } = req.body;
    pool.query('UPDATE publisher SET publisher = $1, publisherLocation = $2 WHERE publisher_id = $3', [publisher, location, req.params.id])
    .then(() => {
        res.send(`Publisher updated with publisher_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

const deletePublisher = (req, res) => {
    pool.query('DELETE FROM publisher WHERE publisher_id = $1', [req.params.id])
    .then(() => {
        res.send(`Publisher deleted with publisher_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
    getAllPublishers,
    getPublisherById,
    addNewPublisher,
    updatePublisherById,
    deletePublisher,
}