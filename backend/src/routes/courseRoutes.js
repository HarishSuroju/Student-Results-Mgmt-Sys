const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/auth");
const {
  listCourses,
  createCourseRecord,
  updateCourseRecord,
  deleteCourseRecord,
} = require("../controllers/courseController");
const { validateCourse } = require("../middleware/validator");

const router = express.Router();

router.use(authenticateUser);
router.get("/", listCourses);
router.post("/", authorizeAdmin, validateCourse, createCourseRecord);
router.put("/:id", authorizeAdmin, validateCourse, updateCourseRecord);
router.delete("/:id", authorizeAdmin, deleteCourseRecord);

module.exports = router;

