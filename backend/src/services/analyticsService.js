const { query } = require("../config/database");

async function getOverview() {
  const [
    students,
    faculty,
    courses,
    subjects,
    results,
    passRate,
    topPerformers,
    courseWiseResults,
    semesterWiseResults,
    averageMarksPerSubject,
  ] = await Promise.all([
    query("SELECT COUNT(*) AS total FROM students"),
    query("SELECT COUNT(*) AS total FROM faculty"),
    query("SELECT COUNT(*) AS total FROM courses"),
    query("SELECT COUNT(*) AS total FROM subjects"),
    query("SELECT COUNT(*) AS total FROM results"),
    query(
      `SELECT
         ROUND((SUM(CASE WHEN marks >= 50 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0)) * 100, 2) AS pass_percentage
       FROM results`,
    ),
    query(
      `SELECT st.name, st.roll_number, ROUND(AVG(r.marks), 2) AS average_marks
       FROM results r
       INNER JOIN students st ON st.id = r.student_id
       GROUP BY r.student_id
       ORDER BY average_marks DESC
       LIMIT 5`,
    ),
    query(
      `SELECT c.course_name,
              ROUND(AVG(r.marks), 2) AS average_marks,
              ROUND((SUM(CASE WHEN r.marks >= 50 THEN 1 ELSE 0 END) / NULLIF(COUNT(r.id), 0)) * 100, 2) AS pass_percentage
       FROM results r
       INNER JOIN students st ON st.id = r.student_id
       INNER JOIN courses c ON c.id = st.course_id
       GROUP BY c.id
       ORDER BY c.course_name ASC`,
    ),
    query(
      `SELECT semester,
              ROUND(AVG(marks), 2) AS average_marks,
              ROUND((SUM(CASE WHEN marks >= 50 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0)) * 100, 2) AS pass_percentage
       FROM results
       GROUP BY semester
       ORDER BY semester ASC`,
    ),
    query(
      `SELECT sub.subject_name,
              sub.subject_code,
              ROUND(AVG(r.marks), 2) AS average_marks
       FROM results r
       INNER JOIN subjects sub ON sub.id = r.subject_id
       GROUP BY sub.id
       ORDER BY average_marks DESC`,
    ),
  ]);

  return {
    totals: {
      students: students[0]?.total || 0,
      faculty: faculty[0]?.total || 0,
      courses: courses[0]?.total || 0,
      subjects: subjects[0]?.total || 0,
      results: results[0]?.total || 0,
    },
    passPercentage: passRate[0]?.pass_percentage || 0,
    topPerformers,
    courseWiseResults,
    semesterWiseResults,
    averageMarksPerSubject,
  };
}

module.exports = { getOverview };
