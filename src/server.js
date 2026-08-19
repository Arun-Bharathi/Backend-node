const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 7200;

app.use(express.json());
app.use(cors());

const pool = require("./configure/neon");

const healthRouter = require("./routes/healthRouter");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");

app.use("/api", healthRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", loginRouter);

async function connectDB() {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Neon Database Connected");
  } catch (err) {
    console.error("❌ Database Error:", err.message);
  }
}

connectDB();

app.use(
  cors({
    origin: "http://localhost:7000",
  }),
);

app.get("/", (req, res) => {
  res.send("Server is up and running ");
});

app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:7200");
});

module.exports = app;
