const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { asyncHandler } = require("../utils/asyncHandler");
const { AppError } = require("../utils/appError");
const { findById } = require("../models/userModel");

const authenticateUser = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Authentication token is required.", 401);
  }

  const token = authHeader.replace("Bearer ", "");
  const payload = jwt.verify(token, env.jwtSecret);
  const user = await findById(payload.sub);

  if (!user) {
    throw new AppError("User session is no longer valid.", 401);
  }

  req.user = user;
  next();
});

function authorizeRoles(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to access this resource.", 403));
    }

    next();
  };
}

module.exports = {
  authenticateUser,
  authorizeRoles,
  authorizeAdmin: authorizeRoles("admin"),
  authorizeFaculty: authorizeRoles("faculty"),
  authorizeStudent: authorizeRoles("student"),
};
