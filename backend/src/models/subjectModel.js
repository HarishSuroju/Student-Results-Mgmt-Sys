const { query } = require("../config/database");

function getSubjects() {
  return query(
    `SELECT sub.*, c.course_name
     FROM subjects sub
     LEFT JOIN courses c ON c.id = sub.course_id
     ORDER BY sub.semester ASC, sub.subject_name ASC`,
  );
}

function createSubject(connection, subject) {
  return connection.execute(
    `INSERT INTO subjects (subject_code, subject_name, course_id, semester, credits)
     VALUES (?, ?, ?, ?, ?)`,
    [subject.subjectCode, subject.subjectName, subject.courseId, subject.semester, subject.credits],
  );
}

function updateSubject(connection, subject) {
  return connection.execute(
    `UPDATE subjects
     SET subject_code = ?, subject_name = ?, course_id = ?, semester = ?, credits = ?
     WHERE id = ?`,
    [subject.subjectCode, subject.subjectName, subject.courseId, subject.semester, subject.credits, subject.id],
  );
}

function deleteSubject(connection, id) {
  return connection.execute("DELETE FROM subjects WHERE id = ?", [id]);
}

module.exports = {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
};
