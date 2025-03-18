const express = require("express");
const { createMission,getMissions,updateMission } = require("../controllers/mission.controllers");
const router = express.Router();

router.get("/", getMissions);
router.post("/", createMission);
router.put("/:id", updateMission);

module.exports = router;
