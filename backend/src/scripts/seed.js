const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcryptjs");
const { pool } = require("../config/database");

async function run() {
  const schemaPath = path.resolve(__dirname, "../../../database/schema.sql");
  const schemaSql = await fs.readFile(schemaPath, "utf8");
  const connection = await pool.getConnection();

  try {
    await connection.query(schemaSql);

    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const facultyPassword = await bcrypt.hash("Faculty@123", 10);
    const studentPassword = await bcrypt.hash("Student@123", 10);

    await connection.beginTransaction();
    const [courseResult] = await connection.execute(
      "INSERT INTO courses (course_name, duration) VALUES (?, ?), (?, ?)",
      ["B.Tech Computer Science", "4 Years", "BBA", "3 Years"],
    );

    const firstCourseId = courseResult.insertId;

    await connection.execute(
      `INSERT INTO subjects (subject_code, subject_name, course_id, semester, credits)
       VALUES
       ('CS101', 'Programming Fundamentals', ?, 1, 4),
       ('CS102', 'Database Systems', ?, 2, 4),
       ('CS103', 'Data Structures', ?, 3, 4),
       ('BBA101', 'Financial Accounting', ?, 1, 3)`,
      [firstCourseId, firstCourseId, firstCourseId, firstCourseId + 1],
    );

    const [adminUser] = await connection.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      ["admin", "admin@srms.edu", adminPassword, "admin"],
    );

    const [facultyUser] = await connection.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      ["faculty01", "faculty@srms.edu", facultyPassword, "faculty"],
    );

    const [studentUser] = await connection.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      ["student01", "student@srms.edu", studentPassword, "student"],
    );

    const [facultyResult] = await connection.execute(
      `INSERT INTO faculty (faculty_code, name, email, phone, department, user_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      ["FAC-1001", "Dr. Priya Sharma", "faculty@srms.edu", "9876543210", "Computer Science", facultyUser.insertId],
    );

    const [studentResult] = await connection.execute(
      `INSERT INTO students (roll_number, name, email, phone, course_id, semester, user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ["SRMS-2026-001", "Arjun Mehta", "student@srms.edu", "9123456780", firstCourseId, 3, studentUser.insertId],
    );

    const [subjectRows] = await connection.query("SELECT id, semester FROM subjects WHERE course_id = ?", [firstCourseId]);

    for (const subject of subjectRows) {
      const marks = subject.semester === 1 ? 88 : subject.semester === 2 ? 91 : 84;
      const grade = marks >= 90 ? "A+" : marks >= 80 ? "A" : "B";

      await connection.execute(
        `INSERT INTO results (student_id, subject_id, faculty_id, marks, grade, semester)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [studentResult.insertId, subject.id, facultyResult.insertId, marks, grade, subject.semester],
      );
    }

    await connection.commit();
    console.log("Schema and sample data seeded successfully.");
    console.log("Admin: admin@srms.edu / Admin@123");
    console.log("Faculty: faculty@srms.edu / Faculty@123");
    console.log("Student: student@srms.edu / Student@123");
  } catch (error) {
    await connection.rollback();
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    connection.release();
    await pool.end();
  }
}

run();
