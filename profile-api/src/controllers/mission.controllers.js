const db = require("../models");

const getMissions = async (req, res) => {
  try {
    const missionData = await db.Mission.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(missionData);
  } catch (error) {
    console.error("Error fetching missions:", error);
    res.status(500).json({ error: "Could not fetch missions" });
  }
};

const createMission = async (req, res) => {
  const { mission, vision, values, is_active } = req.body;
  try {
    const missionData = await db.Mission.create({
      mission,
      vision,
      values,
      is_active,
    });
    res.status(201).json(missionData);
  } catch (error) {
    console.error("Error creating mission:", error);
    res.status(500).json({ error: "Could not create mission" });
  }
};

const updateMission = async (req, res) => {
  const { id } = req.params;
  const { mission, vision, values, is_active } = req.body;

  try {
    const missionEntry = await db.Mission.findByPk(id);

    if (!missionEntry) {
      return res.status(404).json({ error: "Mission not found" });
    }

    await missionEntry.update({
      mission,
      vision,
      values,
      is_active,
    });

    res.json({ message: "Mission updated successfully", missionEntry });
  } catch (error) {
    console.error("Error updating mission:", error);
    res.status(500).json({ error: "Could not update mission" });
  }
};

module.exports = { getMissions, createMission, updateMission };
