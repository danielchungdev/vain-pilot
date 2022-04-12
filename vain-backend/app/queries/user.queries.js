const db = require('../config/db.config');
const pool = db.pool;

const getAllUsers = (req, res) => {
    pool.query('SELECT * FROM "user"')
    .then(userData => {
        res.send(userData.rows);
    })
    .catch(e => console.error(e.stack));
}

const getUserById = (req, res) => {
    pool.query('SELECT * FROM "user" WHERE user_id = $1', [req.params.id])
    .then(userData => {
        res.send(userData.rows);
    })
    .catch(e => console.error(e.stack));
}

const addNewUser = (req, res) => {
    // specify json for body values
    const { id, fname, lname, email, role, password } = req.body;
    console.log(id, fname, lname, email, role, password)
    pool.query('INSERT INTO "user" (user_id, fname, lname, email, role, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id', [id, fname, lname, email, role, password])
    .then(userData => {
        console.log(userData)
        res.send(userData.rows);
    })
    .catch(e => {
        console.log(e)
        res.status(400).send({message:"Username already exists!"})
    });
}

const updateUserById = (req, res) => {
    const { fname, lname, email, role } = req.body;
    pool.query('UPDATE "user" SET fname = $1, lname = $2, email = $3, role = $5 WHERE user_id = $4', [fname, lname, email, req.params.id, role])
    .then(() => {
        res.send(`User updated with user_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

const deleteUser = (req, res) => {
    pool.query('DELETE FROM "user" WHERE user_id = $1', [req.params.id])
    .then(() => {
        res.send(`User deleted with user_id: ${req.params.id}`);
    })
    .catch(e => console.error(e.stack));
}

const attemptLogin = (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM "user" WHERE user_id = $1 AND password = $2', [username, password])
    .then((userData) => {
        //Meaning that it's successfull
        if (userData.rows.length > 0){
            res.status(200).send(userData.rows);
        }
        //Meaning that it didn't find anything
        else{
            res.status(404).send('User not found')
        }
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    updateUserById,
    deleteUser,
    attemptLogin
}