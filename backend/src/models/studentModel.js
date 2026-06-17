const { query } = require("../config/database");

function getStudents(search = "") {
  const keyword = `%${search}%`;
  return query(
    `SELECT s.id, s.roll_number, s.name, s.email, s.phone, s.course_id, s.semester, s.user_id,
            c.course_name, u.username, u.role, s.created_at
     FROM students s
     INNER JOIN users u ON u.id = s.user_id
     LEFT JOIN courses c ON c.id = s.course_id
     WHERE s.name LIKE ? OR s.roll_number LIKE ? OR s.email LIKE ?
     ORDER BY s.created_at DESC`,
    [keyword, keyword, keyword],
  );
}

function getStudentById(id) {
  return query(
    `SELECT s.*, c.course_name, c.duration, u.username
     FROM students s
     INNER JOIN users u ON u.id = s.user_id
     LEFT JOIN courses c ON c.id = s.course_id
     WHERE s.id = ? LIMIT 1`,
    [id],
  ).then((rows) => rows[0]);
}

function getStudentByUserId(userId) {
  return query(
    `SELECT s.*, c.course_name, c.duration, u.username
     FROM students s
     INNER JOIN users u ON u.id = s.user_id
     LEFT JOIN courses c ON c.id = s.course_id
     WHERE s.user_id = ? LIMIT 1`,
    [userId],
  ).then((rows) => rows[0]);
}

function createStudent(connection, student) {
  return connection.execute(
    `INSERT INTO students (roll_number, name, email, phone, course_id, semester, user_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      student.rollNumber,
      student.name,
      student.email,
      student.phone,
      student.courseId,
      student.semester,
      student.userId,
    ],
  );
}

function updateStudent(connection, student) {
  return connection.execute(
    `UPDATE students
     SET roll_number = ?, name = ?, email = ?, phone = ?, course_id = ?, semester = ?
     WHERE id = ?`,
    [student.rollNumber, student.name, student.email, student.phone, student.courseId, student.semester, student.id],
  );
}

module.exports = {
  getStudents,
  getStudentById,
  getStudentByUserId,
  createStudent,
  updateStudent,
};
