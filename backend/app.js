require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

require("./db");
app.use(cors());
app.use(express.json());

const noteRoutes = require("./routes/noteRoutes");

app.use("/api",noteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});