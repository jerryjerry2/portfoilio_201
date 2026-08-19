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
    let sql = 'insert into users (email, password_hash) values (?, ?)';
    let arrData = [body.email, body.password];

    const result = await pool.query(sql, arrData);

    return result[0].insertId;
}

module.exports ={ 
    findByEmail,
    findById,
    register,
}