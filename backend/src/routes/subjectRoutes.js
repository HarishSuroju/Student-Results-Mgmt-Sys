const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/auth");
const {
  listSubjects,
  createSubjectRecord,
  updateSubjectRecord,
  deleteSubjectRecord,
} = require("../controllers/subjectController");

const router = express.Router();

router.use(authenticateUser);
router.get("/", listSubjects);
router.post("/", authorizeAdmin, createSubjectRecord);
router.put("/:id", authorizeAdmin, updateSubjectRecord);
router.delete("/:id", authorizeAdmin, deleteSubjectRecord);

module.exports = router;
