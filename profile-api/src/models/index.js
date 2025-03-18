const sequelize = require("../config/database");
const Mission = require("./mission.model");

const db = {};
db.sequelize = sequelize;
db.Mission = Mission;

module.exports = db;
