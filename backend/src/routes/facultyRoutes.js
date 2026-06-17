const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/auth");
const {
  listFaculty,
  createFacultyRecord,
  updateFacultyRecord,
  deleteFacultyRecord,
} = require("../controllers/facultyController");

const router = express.Router();

router.use(authenticateUser, authorizeAdmin);
router.get("/", listFaculty);
router.post("/", createFacultyRecord);
router.put("/:id", updateFacultyRecord);
router.delete("/:id", deleteFacultyRecord);

module.exports = router;
