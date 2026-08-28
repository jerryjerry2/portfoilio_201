const pool = require('../config/db');

const findByEmail = async (email) => {
    const [result] = await pool.query('select * from users where email = ?', [email]);

    return result;
}

const findById = async (id) => {
    const [result] = await pool.query('select * from users where id = ?', [id]);

    return result;
}

const register = async (body) => {
    let sql = 'insert into users (email, password_hash, verification_token, verification_expires) values (?, ?, ?, ?)';
    let arrData = [body.email, body.password, body.verification_token, body.verification_expires];

    const result = await pool.query(sql, arrData);

    return result[0].insertId;
}

const updateToken = async (id, token) => {
    await pool.query('update users set token = ? where id = ?', [token, id]);
}

const findByToken = async (token) => {
    const [result] = await pool.query('select * from users where token = ?', [token]);

    return result;
}

const findVerificationToken = async (token) => {
    const [result] = await pool.query('select * from users where verification_token = ?', [token]);

    return result;
}

const verifyEmail = async (id) => {
    await pool.query('update users set is_verified = 1 where id = ? ', [id]);
}

module.exports ={ 
    findByEmail,
    findById,
    register,
    updateToken,
    findByToken,
    findVerificationToken,
    verifyEmail
}