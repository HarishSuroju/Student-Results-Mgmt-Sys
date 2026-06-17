const { query } = require("../config/database");

function getFaculty(search = "") {
  const keyword = `%${search}%`;
  return query(
    `SELECT f.id, f.faculty_code, f.name, f.email, f.phone, f.department, f.user_id,
            u.username, u.role, f.created_at
     FROM faculty f
     INNER JOIN users u ON u.id = f.user_id
     WHERE f.name LIKE ? OR f.faculty_code LIKE ? OR f.email LIKE ?
     ORDER BY f.created_at DESC`,
    [keyword, keyword, keyword],
  );
}

function getFacultyById(id) {
  return query(
    `SELECT f.*, u.username
     FROM faculty f
     INNER JOIN users u ON u.id = f.user_id
     WHERE f.id = ? LIMIT 1`,
    [id],
  ).then((rows) => rows[0]);
}

function getFacultyByUserId(userId) {
  return query(
    `SELECT f.*, u.username
     FROM faculty f
     INNER JOIN users u ON u.id = f.user_id
     WHERE f.user_id = ? LIMIT 1`,
    [userId],
  ).then((rows) => rows[0]);
}

function createFaculty(connection, faculty) {
  return connection.execute(
    `INSERT INTO faculty (faculty_code, name, email, phone, department, user_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [faculty.facultyCode, faculty.name, faculty.email, faculty.phone, faculty.department, faculty.userId],
  );
}

function updateFaculty(connection, faculty) {
  return connection.execute(
    `UPDATE faculty
     SET faculty_code = ?, name = ?, email = ?, phone = ?, department = ?
     WHERE id = ?`,
    [faculty.facultyCode, faculty.name, faculty.email, faculty.phone, faculty.department, faculty.id],
  );
}

module.exports = {
  getFaculty,
  getFacultyById,
  getFacultyByUserId,
  createFaculty,
  updateFaculty,
};
