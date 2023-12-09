require("dotenv").config();
const express = require("express");
const project_server = express();
const cors = require("cors");
const routes = require("./Routes/routes");
require("./DB/connection");
project_server.use(cors());
project_server.use(express.json());
project_server.use(routes);
project_server.use("/uploads", express.static("./uploads"));
const PORT = process.env.PORT || 4000;
project_server.listen(PORT, () => {
  console.log("hello world");
});

project_server.get("/", (req, res) => {
  res.send("<h1>project server started</h1>");
});
