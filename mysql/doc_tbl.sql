CREATE TABLE medplus_db.doc_tb(
    D_id INT AUTO_INCREMENT PRIMARY KEY,
    dr_name VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    password VARCHAR(200) NOT NULL,
    contact VARCHAR(100),
    gender ENUM('male','female'),
    speciality VARCHAR(100)
);