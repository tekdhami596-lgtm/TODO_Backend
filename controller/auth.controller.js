import { loginUser, registerUser } from "../services/auth.Service.js";

export const registerController = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    console.log("username:", username);
    const { user, token } = await registerUser(username, email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login success",
      user,
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logoutController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
