const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const db = require("./models");
const userRoutes = require("./routes/mission.routes");

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use("/missions", userRoutes);

db.sequelize.sync().then(() => {
  console.log("Database synced!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
