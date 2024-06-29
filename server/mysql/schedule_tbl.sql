CREATE TABLE schedule_tb(
	s_id INT AUTO_INCREMENT PRIMARY KEY,
    D_id INT(10) NOT NULL,
    date_ DATE,
    start_time TIME,
    end_time TIME,
    status ENUM('available','booked','unavailable'),
    FOREIGN KEY(D_id) REFERENCES doc_tb(D_id)
);