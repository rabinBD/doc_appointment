CREATE TABLE medplus_db.appointment_tb(
	ap_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT(10) NOT NULL,
    D_id INT(10) NOT NULL,
    s_id INT(10) NOT NULL,
    date_ DATE,
    _time TIME,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    notes TEXT,
    FOREIGN KEY(D_id) REFERENCES doc_tb(D_id),
    FOREIGN KEY(id) REFERENCES user_tb(id),
    FOREIGN KEY(s_id) REFERENCES schedule_tb(s_id)
);