const validators = require("../utils/validation");
const { AppError } = require("../utils/appError");

function runValidators(validations) {
  return (req, _res, next) => {
    const errors = {};
    for (const [field, validateFn] of Object.entries(validations)) {
      const errorMsg = validateFn(req.body[field], req);
      if (errorMsg) {
        errors[field] = errorMsg;
      }
    }

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      const err = new AppError(firstError, 400);
      err.validationErrors = errors;
      return next(err);
    }
    next();
  };
}

const validateLogin = runValidators({
  email: validators.validateEmail,
  password: (v) => validators.validatePassword(v, false),
});

const validateRegister = runValidators({
  username: validators.validateUsername,
  email: validators.validateEmail,
  password: (v) => validators.validatePassword(v, false),
});

const validateCourse = runValidators({
  courseName: validators.validateCourseName,
  duration: validators.validateDuration,
});

const validateStudentCreate = runValidators({
  username: validators.validateUsername,
  email: validators.validateEmail,
  password: (v) => validators.validatePassword(v, false),
  rollNumber: validators.validateRollNumber,
  name: validators.validateName,
  phone: validators.validatePhone,
  semester: validators.validateSemester,
  courseId: (v) => (!v ? "Course selection is required." : null),
});

const validateStudentUpdate = runValidators({
  username: validators.validateUsername,
  email: validators.validateEmail,
  password: (v) => validators.validatePassword(v, true), // Password optional during updates
  rollNumber: validators.validateRollNumber,
  name: validators.validateName,
  phone: validators.validatePhone,
  semester: validators.validateSemester,
  courseId: (v) => (!v ? "Course selection is required." : null),
});

const validateFacultyCreate = runValidators({
  username: validators.validateUsername,
  email: validators.validateEmail,
  password: (v) => validators.validatePassword(v, false),
  facultyCode: validators.validateFacultyCode,
  name: validators.validateName,
  phone: validators.validatePhone,
  department: validators.validateDepartment,
});

const validateFacultyUpdate = runValidators({
  username: validators.validateUsername,
  email: validators.validateEmail,
  password: (v) => validators.validatePassword(v, true), // Password optional during updates
  facultyCode: validators.validateFacultyCode,
  name: validators.validateName,
  phone: validators.validatePhone,
  department: validators.validateDepartment,
});

const validateSubject = runValidators({
  subjectCode: validators.validateSubjectCode,
  subjectName: (v) => (!v || typeof v !== "string" || v.trim().length < 2 ? "Subject name must be at least 2 characters." : null),
  courseId: (v) => (!v ? "Course selection is required." : null),
  semester: validators.validateSemester,
  credits: validators.validateCredits,
});

const validateResult = runValidators({
  studentId: (v) => (!v ? "Student selection is required." : null),
  subjectId: (v) => (!v ? "Subject selection is required." : null),
  marks: validators.validateMarks,
  semester: validators.validateSemester,
});

module.exports = {
  validateLogin,
  validateRegister,
  validateCourse,
  validateStudentCreate,
  validateStudentUpdate,
  validateFacultyCreate,
  validateFacultyUpdate,
  validateSubject,
  validateResult,
};
