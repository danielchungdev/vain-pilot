const db = require('../config/db.config');
const table = "subject";

const getAllSubjects = (req, res) => {
    db.pool.query(`SELECT * FROM ${table}`)
    .then(genreData => {
        res.send(genreData.rows);
    })
    .catch(e => console.error(e.stack));
}S

const getSubjectById = (req, res) => {
    db.pool.query(`SELECT * FROM ${table} WHERE subject_id = $1`, [req.params.id])
    .then(genreData => {
        res.send(genreData.rows);
    })
    .catch(e => console.error(e.stack));
}

const addNewSubject = (req, res) => {
    // specify json for body values
    const { id, subject } = req.body;
    db.pool.query(`INSERT INTO ${table} (subject_id, subject) VALUES ($1, $2)`, [id, subject])
    .then(genreData => {
        res.send(`New Subject added with subject_id: ${id}`);
    })
    .catch(e => console.error(e.stack));
}

const updateSubjectById = (req, res) => {
    const { subject } = req.body;
    db.pool.query(`UPDATE ${table} SET subject = $1 WHERE subject_id = $2`, [subject, req.params.id])
    .then(() => {
        res.send(`Subject updated with subject_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

const deleteSubject = (req, res) => {
    db.pool.query(`DELETE FROM ${table} WHERE subject_id = $1`, [req.params.id])
    .then(() => {
        res.send(`Subject deleted with subject_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
    getAllSubjects,
    getSubjectById,
    addNewSubject,
    updateSubjectById,
    deleteSubject,
}