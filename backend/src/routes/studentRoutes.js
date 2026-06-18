const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middleware/auth");
const {
  listStudents,
  createStudentRecord,
  updateStudentRecord,
  deleteStudentRecord,
} = require("../controllers/studentController");
const { validateStudentCreate, validateStudentUpdate } = require("../middleware/validator");

const router = express.Router();

router.use(authenticateUser);
router.get("/", authorizeRoles("admin", "faculty"), listStudents);
router.post("/", authorizeRoles("admin"), validateStudentCreate, createStudentRecord);
router.put("/:id", authorizeRoles("admin"), validateStudentUpdate, updateStudentRecord);
router.delete("/:id", authorizeRoles("admin"), deleteStudentRecord);

module.exports = router;

