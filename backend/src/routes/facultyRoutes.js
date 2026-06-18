const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/auth");
const {
  listFaculty,
  createFacultyRecord,
  updateFacultyRecord,
  deleteFacultyRecord,
} = require("../controllers/facultyController");
const { validateFacultyCreate, validateFacultyUpdate } = require("../middleware/validator");

const router = express.Router();

router.use(authenticateUser, authorizeAdmin);
router.get("/", listFaculty);
router.post("/", validateFacultyCreate, createFacultyRecord);
router.put("/:id", validateFacultyUpdate, updateFacultyRecord);
router.delete("/:id", deleteFacultyRecord);

module.exports = router;

