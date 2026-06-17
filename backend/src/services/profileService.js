const { getStudentByUserId } = require("../models/studentModel");
const { getFacultyByUserId } = require("../models/facultyModel");

async function getProfileForUser(user) {
  if (user.role === "student") {
    return getStudentByUserId(user.id);
  }

  if (user.role === "faculty") {
    return getFacultyByUserId(user.id);
  }

  return null;
}

module.exports = { getProfileForUser };
