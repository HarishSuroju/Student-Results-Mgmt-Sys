const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/auth");
const {
  listSubjects,
  createSubjectRecord,
  updateSubjectRecord,
  deleteSubjectRecord,
} = require("../controllers/subjectController");
const { validateSubject } = require("../middleware/validator");

const router = express.Router();

router.use(authenticateUser);
router.get("/", listSubjects);
router.post("/", authorizeAdmin, validateSubject, createSubjectRecord);
router.put("/:id", authorizeAdmin, validateSubject, updateSubjectRecord);
router.delete("/:id", authorizeAdmin, deleteSubjectRecord);

module.exports = router;

