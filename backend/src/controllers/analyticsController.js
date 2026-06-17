const { asyncHandler } = require("../utils/asyncHandler");
const { getOverview } = require("../services/analyticsService");

const getAnalyticsOverview = asyncHandler(async (_req, res) => {
  const overview = await getOverview();
  res.json(overview);
});

module.exports = { getAnalyticsOverview };
