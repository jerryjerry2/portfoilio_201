const pool = require('../config/db');

const getProfile = async () => {
    const [result] = await pool.query('select * from personal_info limit 1');

    return result;
}

const updateProfile = async (id, body) => {    
    await pool.query(`update personal_info set 
        full_name = ?,
        title = ?,
        bio = ?,
        email = ?,
        phone = ?,
        location = ?,
        avatar_url = ?,
        resume_url = ?,
        github_url = ?,
        linkedin_url = ?,
        twitter_url = ?
        where id = ?     
    `, [
        body.full_name,
        body.title,
        body.bio,
        body.email,
        body.phone,
        body.location,
        body.avatar_url,
        body.resume_url,
        body.github_url,
        body.linkedin_url,
        body.twitter_url,
        id
    ])
}

module.exports = {
    getProfile,
    updateProfile
}

