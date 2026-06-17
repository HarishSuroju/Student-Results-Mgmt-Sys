const bcrypt = require("bcryptjs");
const { pool } = require("../config/database");
const { findByEmail } = require("../models/userModel");
const { createUser } = require("../models/userModel");
const { createStudent } = require("../models/studentModel");
const { createFaculty } = require("../models/facultyModel");
const { asyncHandler } = require("../utils/asyncHandler");
const { AppError } = require("../utils/appError");
const { signToken } = require("../utils/jwt");
const { getProfileForUser } = require("../services/profileService");

const validRoles = ["admin", "faculty", "student"];

const register = asyncHandler(async (req, res) => {
  const { username, email, password, role, profile = {} } = req.body;

  if (!username || !email || !password || !role) {
    throw new AppError("Username, email, password, and role are required.");
  }

  if (!validRoles.includes(role)) {
    throw new AppError("Invalid role supplied.");
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
      role,
    });

    if (role === "student") {
      await createStudent(connection, {
        rollNumber: profile.rollNumber,
        name: profile.name,
        email,
        phone: profile.phone || "",
        courseId: profile.courseId,
        semester: profile.semester,
        userId: userResult.insertId,
      });
    }

    if (role === "faculty") {
      await createFaculty(connection, {
        facultyCode: profile.facultyCode,
        name: profile.name,
        email,
        phone: profile.phone || "",
        department: profile.department,
        userId: userResult.insertId,
      });
    }

    await connection.commit();

    const user = {
      id: userResult.insertId,
      username,
      email,
      role,
    };

    res.status(201).json({
      message: "User registered successfully.",
      token: signToken(user),
      user,
    });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required.");
  }

  const user = await findByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new AppError("Invalid email or password.", 401);
  }

  const safeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  res.json({
    message: "Login successful.",
    token: signToken(safeUser),
    user: safeUser,
  });
});

const profile = asyncHandler(async (req, res) => {
  const profileDetails = await getProfileForUser(req.user);

  res.json({
    user: req.user,
    profile: profileDetails,
  });
});

module.exports = { register, login, profile };
