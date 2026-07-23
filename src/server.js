const express = require("express");
const app = express();
const PORT = 7200;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running ");
});

app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:7200");
});
