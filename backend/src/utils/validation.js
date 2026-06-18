const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const codeRegex = /^[a-zA-Z0-9-]+$/;

function validateEmail(email) {
  if (!email || typeof email !== "string") return "Email is required.";
  if (!emailRegex.test(email)) return "Invalid email address format.";
  return null;
}

function validatePhone(phone) {
  if (!phone) return null; // Phone is optional in database schema (allow empty)
  if (typeof phone !== "string" || !phoneRegex.test(phone)) {
    return "Phone number must be exactly 10 digits.";
  }
  return null;
}

function validateUsername(username) {
  if (!username || typeof username !== "string" || username.trim().length < 3) {
    return "Username must be at least 3 characters long.";
  }
  return null;
}

function validatePassword(password, isOptional = false) {
  if (isOptional && !password) return null;
  if (!password || typeof password !== "string" || password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
}

function validateRollNumber(rollNumber) {
  if (!rollNumber || typeof rollNumber !== "string" || rollNumber.trim().length < 2) {
    return "Roll number is required.";
  }
  if (!codeRegex.test(rollNumber)) {
    return "Roll number must be alphanumeric (hyphens allowed).";
  }
  return null;
}

function validateFacultyCode(facultyCode) {
  if (!facultyCode || typeof facultyCode !== "string" || facultyCode.trim().length < 2) {
    return "Faculty code is required.";
  }
  if (!codeRegex.test(facultyCode)) {
    return "Faculty code must be alphanumeric (hyphens allowed).";
  }
  return null;
}

function validateSubjectCode(subjectCode) {
  if (!subjectCode || typeof subjectCode !== "string" || subjectCode.trim().length < 2) {
    return "Subject code is required.";
  }
  if (!codeRegex.test(subjectCode)) {
    return "Subject code must be alphanumeric (hyphens allowed).";
  }
  return null;
}

function validateSemester(semester) {
  const sem = Number(semester);
  if (isNaN(sem) || sem < 1 || sem > 8) {
    return "Semester must be a number between 1 and 8.";
  }
  return null;
}

function validateCredits(credits) {
  const creds = Number(credits);
  if (isNaN(creds) || creds < 1 || creds > 6) {
    return "Credits must be a number between 1 and 6.";
  }
  return null;
}

function validateMarks(marks) {
  const m = Number(marks);
  if (isNaN(m) || m < 0 || m > 100) {
    return "Marks must be a number between 0 and 100.";
  }
  return null;
}

function validateName(name) {
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Full name must be at least 2 characters long.";
  }
  return null;
}

function validateCourseName(name) {
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Course name must be at least 2 characters long.";
  }
  return null;
}

function validateDuration(duration) {
  if (!duration || typeof duration !== "string" || duration.trim().length < 1) {
    return "Course duration is required.";
  }
  return null;
}

function validateDepartment(dept) {
  if (!dept || typeof dept !== "string" || dept.trim().length < 2) {
    return "Department must be at least 2 characters long.";
  }
  return null;
}

module.exports = {
  validateEmail,
  validatePhone,
  validateUsername,
  validatePassword,
  validateRollNumber,
  validateFacultyCode,
  validateSubjectCode,
  validateSemester,
  validateCredits,
  validateMarks,
  validateName,
  validateCourseName,
  validateDuration,
  validateDepartment,
};
