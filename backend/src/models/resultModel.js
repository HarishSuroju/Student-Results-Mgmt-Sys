const { query } = require("../config/database");

function getResults(filters = {}) {
  const clauses = [];
  const params = [];

  if (filters.facultyId) {
    clauses.push("r.faculty_id = ?");
    params.push(filters.facultyId);
  }

  if (filters.studentId) {
    clauses.push("r.student_id = ?");
    params.push(filters.studentId);
  }

  const whereClause = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  return query(
    `SELECT r.id, r.student_id, r.subject_id, r.faculty_id, r.marks, r.grade, r.semester, r.created_at,
            st.name AS student_name, st.roll_number, sub.subject_name, sub.subject_code, sub.credits,
            f.name AS faculty_name, c.course_name
     FROM results r
     INNER JOIN students st ON st.id = r.student_id
     INNER JOIN subjects sub ON sub.id = r.subject_id
     INNER JOIN faculty f ON f.id = r.faculty_id
     LEFT JOIN courses c ON c.id = st.course_id
     ${whereClause}
     ORDER BY r.created_at DESC`,
    params,
  );
}

function getResultById(id) {
  return query("SELECT * FROM results WHERE id = ? LIMIT 1", [id]).then((rows) => rows[0]);
}

function getStudentResults(studentId) {
  return query(
    `SELECT r.id, r.student_id, r.subject_id, r.faculty_id, r.marks, r.grade, r.semester, r.created_at,
            sub.subject_name, sub.subject_code, sub.credits, f.name AS faculty_name
     FROM results r
     INNER JOIN subjects sub ON sub.id = r.subject_id
     INNER JOIN faculty f ON f.id = r.faculty_id
     WHERE r.student_id = ?
     ORDER BY r.semester ASC, sub.subject_name ASC`,
    [studentId],
  );
}

function createResult(connection, result) {
  return connection.execute(
    `INSERT INTO results (student_id, subject_id, faculty_id, marks, grade, semester)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [result.studentId, result.subjectId, result.facultyId, result.marks, result.grade, result.semester],
  );
}

function updateResult(connection, result) {
  return connection.execute(
    `UPDATE results
     SET student_id = ?, subject_id = ?, faculty_id = ?, marks = ?, grade = ?, semester = ?
     WHERE id = ?`,
    [
      result.studentId,
      result.subjectId,
      result.facultyId,
      result.marks,
      result.grade,
      result.semester,
      result.id,
    ],
  );
}

function deleteResult(connection, id) {
  return connection.execute("DELETE FROM results WHERE id = ?", [id]);
}

module.exports = {
  getResults,
  getResultById,
  getStudentResults,
  createResult,
  updateResult,
  deleteResult,
};
