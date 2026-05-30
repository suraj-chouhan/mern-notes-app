const express = require("express");
const cors = require("cors");

const app = express();

require("./db");
app.use(cors());
app.use(express.json());

const noteRoutes = require("./routes/noteRoutes");

app.use("/api",noteRoutes);

app.listen(3000,()=>{
	console.log("Server running on 3000 port");
});