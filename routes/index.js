const express = require("express");
const router = express.Router();
// api router routing to the api
router.use("/api", require("./api"));
module.exports = router;
