const pool = require('../config/db');

const createProfile = async () => {
    try {
        await pool.query(`insert into personal_info (
            full_name, 
            title, 
            bio, 
            email, 
            phone) 
            values (?, ? ,?, ?, ?)`, 
            [
                'Jerry',
                'Web Developer',
                'I am web developer',
                'test@gmail.com',
                '012123123',
            ]);
        console.log('Seed inserted successfully');
    } catch (error) {
        console.log('Seed inserted failed');
        console.log(error);
    }
}

createProfile();