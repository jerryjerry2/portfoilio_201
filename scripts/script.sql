CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- 2. Personal Info / About Me Table (Single Record Design)
CREATE TABLE IF NOT EXISTS personal_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,              -- e.g. "Full Stack Developer"
    bio TEXT NOT NULL,                        -- Long description / About Me section
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NULL,
    location VARCHAR(100) NULL,        -- e.g. "New York, USA" or "Remote"
    avatar_url VARCHAR(255) NULL,      -- Profile picture
    resume_url VARCHAR(255) NULL,      -- PDF download link
    github_url VARCHAR(255) NULL,
    linkedin_url VARCHAR(255) NULL,
    twitter_url VARCHAR(255) NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

select * from personal_info limit 1;

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS users ( 
     id INT AUTO_INCREMENT PRIMARY KEY, 
     email VARCHAR(100) NOT NULL UNIQUE,
     full_name VARCHAR(100) NOT NULL,
     phone VARCHAR(20) NULL,
     password_hash VARCHAR(255) NOT NULL,
     token varchar(255) NULL,
     is_verified TINYINT(1) DEFAULT 0,
     verification_token VARCHAR(255) DEFAULT NULL,
     verification_expires DATETIME DEFAULT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);