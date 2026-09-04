const userModel = require("../models/userModel");

async function createUser(req, res) {
  try {
    const { first_name, last_name, mobile_number, email, role, status } =
      req.body;

    const result = await userModel.createUser({
      first_name,
      last_name,
      mobile_number,
      email,
      role,
      status,
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

async function deleteUser(req, res) {
  try {
    const { id } = req.body;

    const result = await userModel.deleteUser(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user deleted sucessfully",
    });
  } catch (error) {
    console.error("Delete User Error", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.body;

    const result = await userModel.getUser(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Fetch details failed", error.message);

    return res.status(500).json({
      success: false,
      message: "failed to fetch",
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const result = await userModel.getAllUsers();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Fetch failed", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
}

module.exports = { createUser, deleteUser, getUser, getAllUsers };
