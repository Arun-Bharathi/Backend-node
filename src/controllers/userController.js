const userModel = require("../models/userModel");

async function createUser(req, res) {
  try {
    const { name, age } = req.body;

    const result = await userModel.createUser({
      name,
      age,
    });
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Create User Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

module.exports = { createUser };
