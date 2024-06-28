CREATE TABLE medplus_db.user_tb(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    gender ENUM('male','female','other'),
    contact VARCHAR(100),
    date_of_birth DATE
);