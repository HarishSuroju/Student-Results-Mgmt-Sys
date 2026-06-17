const { pool } = require("../config/database");
const { getCourses, createCourse, updateCourse, deleteCourse } = require("../models/courseModel");
const { asyncHandler } = require("../utils/asyncHandler");

const listCourses = asyncHandler(async (_req, res) => {
  const courses = await getCourses();
  res.json(courses);
});

const createCourseRecord = asyncHandler(async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await createCourse(connection, {
      courseName: req.body.courseName,
      duration: req.body.duration,
    });
    res.status(201).json({ message: "Course created successfully." });
  } finally {
    connection.release();
  }
});

const updateCourseRecord = asyncHandler(async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await updateCourse(connection, {
      id: req.params.id,
      courseName: req.body.courseName,
      duration: req.body.duration,
    });
    res.json({ message: "Course updated successfully." });
  } finally {
    connection.release();
  }
});

const deleteCourseRecord = asyncHandler(async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await deleteCourse(connection, req.params.id);
    res.json({ message: "Course deleted successfully." });
  } finally {
    connection.release();
  }
});

module.exports = {
  listCourses,
  createCourseRecord,
  updateCourseRecord,
  deleteCourseRecord,
};
