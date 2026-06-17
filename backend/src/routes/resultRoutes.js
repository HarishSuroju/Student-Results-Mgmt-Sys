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

const router = express.Router();

router.use(authenticateUser);
router.get("/", authorizeRoles("admin", "faculty"), listResults);
router.post("/", authorizeRoles("admin", "faculty"), createResultRecord);
router.put("/:id", authorizeRoles("admin", "faculty"), updateResultRecord);
router.delete("/:id", authorizeRoles("admin"), deleteResultRecord);
router.get("/student/:id", authorizeRoles("admin", "faculty", "student"), listStudentResults);
router.get("/student/:id/marksheet", authorizeRoles("admin", "student"), downloadMarksheet);

module.exports = router;
