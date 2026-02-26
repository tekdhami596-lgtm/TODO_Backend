import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      message: "Failed  to fetch users",
    });
  }
};
