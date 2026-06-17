const { query } = require("../config/database");

function getCourses() {
  return query(
    `SELECT c.*,
            COUNT(DISTINCT s.id) AS total_students,
            COUNT(DISTINCT sub.id) AS total_subjects
     FROM courses c
     LEFT JOIN students s ON s.course_id = c.id
     LEFT JOIN subjects sub ON sub.course_id = c.id
     GROUP BY c.id
     ORDER BY c.course_name ASC`,
  );
}

function createCourse(connection, course) {
  return connection.execute("INSERT INTO courses (course_name, duration) VALUES (?, ?)", [
    course.courseName,
    course.duration,
  ]);
}

function updateCourse(connection, course) {
  return connection.execute("UPDATE courses SET course_name = ?, duration = ? WHERE id = ?", [
    course.courseName,
    course.duration,
    course.id,
  ]);
}

function deleteCourse(connection, id) {
  return connection.execute("DELETE FROM courses WHERE id = ?", [id]);
}

module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
