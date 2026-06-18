const express = require("express");
const { register, login, profile } = require("../controllers/authController");
const { authenticateUser } = require("../middleware/auth");
const { validateLogin, validateRegister } = require("../middleware/validator");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", authenticateUser, profile);

module.exports = router;

