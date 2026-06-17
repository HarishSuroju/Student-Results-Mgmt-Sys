const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/auth");
const { getAnalyticsOverview } = require("../controllers/analyticsController");

const router = express.Router();

router.use(authenticateUser, authorizeAdmin);
router.get("/overview", getAnalyticsOverview);

module.exports = router;
