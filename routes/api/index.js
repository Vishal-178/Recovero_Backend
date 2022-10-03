const express = require("express");
const router = express.Router();
const data = require("../../models/api/getData_api");
// getData router routing to the getData api
router.get("/getData", data.getData);

module.exports = router;
