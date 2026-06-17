const bcrypt = require("bcryptjs");
const { pool } = require("../config/database");
const { getStudents, getStudentById } = require("../models/studentModel");
const { createStudent, updateStudent } = require("../models/studentModel");
const { createUser, updateUser, deleteUser, findByEmail } = require("../models/userModel");
const { asyncHandler } = require("../utils/asyncHandler");
const { AppError } = require("../utils/appError");

const listStudents = asyncHandler(async (req, res) => {
  const students = await getStudents(req.query.search || "");
  res.json(students);
});

const createStudentRecord = asyncHandler(async (req, res) => {
  const { username, email, password, rollNumber, name, phone, courseId, semester } = req.body;

  if (!username || !email || !password || !rollNumber || !name || !courseId || !semester) {
    throw new AppError("Student account, academic, and identity fields are required.");
  }

  const existingUser = await findByEmail(email);
  if (existingUser) {
    throw new AppError("A user with this email already exists.", 409);
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const passwordHash = await bcrypt.hash(password, 10);
    const [userResult] = await createUser(connection, {
      username,
      email,
      passwordHash,
      role: "student",
    });

    await createStudent(connection, {
      rollNumber,
      name,
      email,
      phone: phone || "",
      courseId,
      semester,
      userId: userResult.insertId,
    });

    await connection.commit();
    res.status(201).json({ message: "Student created successfully." });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
});

const updateStudentRecord = asyncHandler(async (req, res) => {
  const student = await getStudentById(req.params.id);
  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  const { username, email, password, rollNumber, name, phone, courseId, semester } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await updateStudent(connection, {
      id: req.params.id,
      rollNumber,
      name,
      email,
      phone: phone || "",
      courseId,
      semester,
    });

    const passwordHash = password ? await bcrypt.hash(password, 10) : null;
    await updateUser(connection, {
      id: student.user_id,
      username,
      email,
      passwordHash,
    });

    await connection.commit();
    res.json({ message: "Student updated successfully." });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
});

const deleteStudentRecord = asyncHandler(async (req, res) => {
  const student = await getStudentById(req.params.id);
  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await deleteUser(connection, student.user_id);
    await connection.commit();
    res.json({ message: "Student deleted successfully." });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
});

module.exports = {
  listStudents,
  createStudentRecord,
  updateStudentRecord,
  deleteStudentRecord,
};
