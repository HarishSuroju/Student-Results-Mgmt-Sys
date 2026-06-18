const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middleware/auth");
const {
  listResults,
  createResultRecord,
  updateResultRecord,
  deleteResultRecord,
  listStudentResults,
  downloadMarksheet,
} = require("../controllers/resultController");
const { validateResult } = require("../middleware/validator");

const router = express.Router();

router.use(authenticateUser);
router.get("/", authorizeRoles("admin", "faculty"), listResults);
router.post("/", authorizeRoles("admin", "faculty"), validateResult, createResultRecord);
router.put("/:id", authorizeRoles("admin", "faculty"), validateResult, updateResultRecord);
router.delete("/:id", authorizeRoles("admin"), deleteResultRecord);
router.get("/student/:id", authorizeRoles("admin", "faculty", "student"), listStudentResults);
router.get("/student/:id/marksheet", authorizeRoles("admin", "student"), downloadMarksheet);

module.exports = router;

