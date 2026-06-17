const { pool } = require("../config/database");
const { getSubjects, createSubject, updateSubject, deleteSubject } = require("../models/subjectModel");
const { asyncHandler } = require("../utils/asyncHandler");

const listSubjects = asyncHandler(async (_req, res) => {
  const subjects = await getSubjects();
  res.json(subjects);
});

const createSubjectRecord = asyncHandler(async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await createSubject(connection, {
      subjectCode: req.body.subjectCode,
      subjectName: req.body.subjectName,
      courseId: req.body.courseId,
      semester: req.body.semester,
      credits: req.body.credits,
    });
    res.status(201).json({ message: "Subject created successfully." });
  } finally {
    connection.release();
  }
});

const updateSubjectRecord = asyncHandler(async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await updateSubject(connection, {
      id: req.params.id,
      subjectCode: req.body.subjectCode,
      subjectName: req.body.subjectName,
      courseId: req.body.courseId,
      semester: req.body.semester,
      credits: req.body.credits,
    });
    res.json({ message: "Subject updated successfully." });
  } finally {
    connection.release();
  }
});

const deleteSubjectRecord = asyncHandler(async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await deleteSubject(connection, req.params.id);
    res.json({ message: "Subject deleted successfully." });
  } finally {
    connection.release();
  }
});

module.exports = {
  listSubjects,
  createSubjectRecord,
  updateSubjectRecord,
  deleteSubjectRecord,
};
