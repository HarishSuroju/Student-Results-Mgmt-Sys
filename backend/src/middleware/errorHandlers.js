function notFoundHandler(req, _res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(error, _req, res, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong.";
  const validationErrors = error.validationErrors || null;

  // Handle MySQL Duplicate Entry violations
  if (error.code === "ER_DUP_ENTRY") {
    statusCode = 409; // Conflict
    const sqlMessage = error.sqlMessage || "";
    if (sqlMessage.includes("users.email") || sqlMessage.includes("email")) {
      message = "A user account with this email address already exists.";
    } else if (sqlMessage.includes("students.roll_number") || sqlMessage.includes("roll_number")) {
      message = "A student with this roll number already exists.";
    } else if (sqlMessage.includes("faculty.faculty_code") || sqlMessage.includes("faculty_code")) {
      message = "A faculty member with this faculty code already exists.";
    } else if (sqlMessage.includes("subjects.subject_code") || sqlMessage.includes("subject_code")) {
      message = "A subject with this subject code already exists.";
    } else if (sqlMessage.includes("uq_results_student_subject_sem")) {
      message = "A result record for this student, subject, and semester already exists.";
    } else {
      message = "A record with these unique details already exists in the system.";
    }
  }

  res.status(statusCode).json({
    message,
    errors: validationErrors,
  });
}

module.exports = { notFoundHandler, errorHandler };

