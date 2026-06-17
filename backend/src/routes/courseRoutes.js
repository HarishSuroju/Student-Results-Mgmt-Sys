const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/auth");
const {
  listCourses,
  createCourseRecord,
  updateCourseRecord,
  deleteCourseRecord,
} = require("../controllers/courseController");

const router = express.Router();

router.use(authenticateUser);
router.get("/", listCourses);
router.post("/", authorizeAdmin, createCourseRecord);
router.put("/:id", authorizeAdmin, updateCourseRecord);
router.delete("/:id", authorizeAdmin, deleteCourseRecord);

module.exports = router;
