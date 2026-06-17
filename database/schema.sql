CREATE DATABASE IF NOT EXISTS srms;
USE srms;

DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'faculty', 'student') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_name VARCHAR(150) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roll_number VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  course_id INT NOT NULL,
  semester INT NOT NULL,
  user_id INT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_students_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT,
  CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE faculty (
  id INT PRIMARY KEY AUTO_INCREMENT,
  faculty_code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  department VARCHAR(120) NOT NULL,
  user_id INT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_faculty_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE subjects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  subject_code VARCHAR(50) NOT NULL UNIQUE,
  subject_name VARCHAR(150) NOT NULL,
  course_id INT NOT NULL,
  semester INT NOT NULL,
  credits INT NOT NULL DEFAULT 3,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_subjects_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  subject_id INT NOT NULL,
  faculty_id INT NOT NULL,
  marks DECIMAL(5,2) NOT NULL,
  grade VARCHAR(2) NOT NULL,
  semester INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_results_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  CONSTRAINT fk_results_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
  CONSTRAINT fk_results_faculty FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
  CONSTRAINT uq_results_student_subject_sem UNIQUE (student_id, subject_id, semester)
);

CREATE INDEX idx_results_student ON results(student_id);
CREATE INDEX idx_results_faculty ON results(faculty_id);
CREATE INDEX idx_subjects_course_semester ON subjects(course_id, semester);
