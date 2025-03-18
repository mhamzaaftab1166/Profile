const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const {missionColumns} =require("../utils/columns")

const MissionModel = sequelize.define("Mission", {
  [missionColumns.mission]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  [missionColumns.vision]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  [missionColumns.values]: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  [missionColumns.isActive]: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = MissionModel;
