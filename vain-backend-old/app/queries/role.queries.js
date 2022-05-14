const db = require('../config/db.config');
const pool = db.pool;

const getAllRoles = (req, res) => {
    pool.query('SELECT * FROM role')
    .then(roleData => {
        res.send(roleData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getRoleById = (req, res) => {
    pool.query('SELECT * FROM role WHERE role_id = $1', [req.params.id])
    .then(roleData => {
        res.send(roleData.rows);
    })
    .catch(e => console.error(e.stack));
}

const addNewRole = (req, res) => {
    // specify json for body values
    const { id, role } = req.body;
    pool.query('INSERT INTO role (role_id, role) VALUES ($1, $2)', [id, role])
    .then(() => {
        res.send(`New Role added with role_id: ${id}`);
    })
    .catch(e => console.error(e));
}

const updateRoleByid = (req, res) => {
    const { role } = req.body;
    pool.query('UPDATE role SET role = $1 WHERE role_id = $2', [role, req.params.id])
    .then(() => {
        res.send(`Role updated with role_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

const deleteRole = (req, res) => {
    pool.query('DELETE FROM role WHERE role_id = $1', [req.params.id])
    .then(() => {
        res.send(`Role deleted with role_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
    getAllRoles,
    getRoleById,
    addNewRole,
    updateRoleByid,
    deleteRole,
}