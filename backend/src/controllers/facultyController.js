const bcrypt = require("bcryptjs");
const { pool } = require("../config/database");
const { getFaculty, getFacultyById } = require("../models/facultyModel");
const { createFaculty, updateFaculty } = require("../models/facultyModel");
const { createUser, updateUser, deleteUser, findByEmail } = require("../models/userModel");
const { asyncHandler } = require("../utils/asyncHandler");
const { AppError } = require("../utils/appError");

const listFaculty = asyncHandler(async (req, res) => {
  const faculty = await getFaculty(req.query.search || "");
  res.json(faculty);
});

const createFacultyRecord = asyncHandler(async (req, res) => {
  const { username, email, password, facultyCode, name, phone, department } = req.body;

  if (!username || !email || !password || !facultyCode || !name || !department) {
    throw new AppError("Faculty account and profile fields are required.");
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
      role: "faculty",
    });

    await createFaculty(connection, {
      facultyCode,
      name,
      email,
      phone: phone || "",
      department,
      userId: userResult.insertId,
    });

    await connection.commit();
    res.status(201).json({ message: "Faculty created successfully." });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
});

const updateFacultyRecord = asyncHandler(async (req, res) => {
  const faculty = await getFacultyById(req.params.id);
  if (!faculty) {
    throw new AppError("Faculty member not found.", 404);
  }

  const { username, email, password, facultyCode, name, phone, department } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await updateFaculty(connection, {
      id: req.params.id,
      facultyCode,
      name,
      email,
      phone: phone || "",
      department,
    });

    const passwordHash = password ? await bcrypt.hash(password, 10) : null;
    await updateUser(connection, {
      id: faculty.user_id,
      username,
      email,
      passwordHash,
    });

    await connection.commit();
    res.json({ message: "Faculty updated successfully." });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
});

const deleteFacultyRecord = asyncHandler(async (req, res) => {
  const faculty = await getFacultyById(req.params.id);
  if (!faculty) {
    throw new AppError("Faculty member not found.", 404);
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await deleteUser(connection, faculty.user_id);
    await connection.commit();
    res.json({ message: "Faculty deleted successfully." });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
});

module.exports = {
  listFaculty,
  createFacultyRecord,
  updateFacultyRecord,
  deleteFacultyRecord,
};
