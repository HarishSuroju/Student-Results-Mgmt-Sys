const { pool } = require("../config/database");
const { asyncHandler } = require("../utils/asyncHandler");
const { AppError } = require("../utils/appError");
const { calculateGrade, calculateCgpa, calculatePercentage } = require("../utils/resultUtils");
const { getFacultyByUserId } = require("../models/facultyModel");
const { getStudentById } = require("../models/studentModel");
const {
  getResults,
  getResultById,
  getStudentResults,
  createResult,
  updateResult,
  deleteResult,
} = require("../models/resultModel");
const { createMarksheetPdf } = require("../services/pdfService");

const listResults = asyncHandler(async (req, res) => {
  let facultyId;

  if (req.user.role === "faculty") {
    const faculty = await getFacultyByUserId(req.user.id);
    facultyId = faculty?.id;
  }

  const results = await getResults({
    facultyId,
    studentId: req.query.studentId,
  });

  res.json(results);
});

const createResultRecord = asyncHandler(async (req, res) => {
  const { studentId, subjectId, marks, semester } = req.body;

  if (marks < 0 || marks > 100) {
    throw new AppError("Marks must be between 0 and 100.");
  }

  const faculty = req.user.role === "faculty" ? await getFacultyByUserId(req.user.id) : null;
  const facultyId = req.body.facultyId || faculty?.id;

  if (!facultyId) {
    throw new AppError("Faculty context is required to submit marks.");
  }

  const connection = await pool.getConnection();

  try {
    await createResult(connection, {
      studentId,
      subjectId,
      facultyId,
      marks,
      grade: calculateGrade(Number(marks)),
      semester,
    });

    res.status(201).json({ message: "Result created successfully." });
  } finally {
    connection.release();
  }
});

const updateResultRecord = asyncHandler(async (req, res) => {
  const existingResult = await getResultById(req.params.id);

  if (!existingResult) {
    throw new AppError("Result not found.", 404);
  }

  const { studentId, subjectId, marks, semester } = req.body;
  if (marks < 0 || marks > 100) {
    throw new AppError("Marks must be between 0 and 100.");
  }

  const faculty = req.user.role === "faculty" ? await getFacultyByUserId(req.user.id) : null;
  const facultyId = req.body.facultyId || faculty?.id || existingResult.faculty_id;
  const connection = await pool.getConnection();

  try {
    await updateResult(connection, {
      id: req.params.id,
      studentId,
      subjectId,
      facultyId,
      marks,
      grade: calculateGrade(Number(marks)),
      semester,
    });

    res.json({ message: "Result updated successfully." });
  } finally {
    connection.release();
  }
});

const deleteResultRecord = asyncHandler(async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await deleteResult(connection, req.params.id);
    res.json({ message: "Result deleted successfully." });
  } finally {
    connection.release();
  }
});

const listStudentResults = asyncHandler(async (req, res) => {
  const student = await getStudentById(req.params.id);
  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  if (req.user.role === "student" && student.user_id !== req.user.id) {
    throw new AppError("You can only access your own results.", 403);
  }

  const results = await getStudentResults(req.params.id);
  const totalMarks = results.reduce((sum, item) => sum + Number(item.marks), 0);
  const percentage = calculatePercentage(totalMarks, results.length);
  const cgpa = calculateCgpa(results);

  res.json({
    student,
    results,
    summary: {
      totalMarks,
      percentage,
      cgpa,
    },
  });
});

const downloadMarksheet = asyncHandler(async (req, res) => {
  const student = await getStudentById(req.params.id);
  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  if (req.user.role === "student" && student.user_id !== req.user.id) {
    throw new AppError("You can only download your own marksheet.", 403);
  }

  const results = await getStudentResults(req.params.id);
  const pdf = createMarksheetPdf({ student, results });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=\"${student.roll_number}-marksheet.pdf\"`);
  pdf.pipe(res);
});

module.exports = {
  listResults,
  createResultRecord,
  updateResultRecord,
  deleteResultRecord,
  listStudentResults,
  downloadMarksheet,
};
