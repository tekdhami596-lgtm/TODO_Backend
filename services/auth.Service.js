import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (username, email, password) => {
  // all the data should exists
  if (!(username && email && password)) {
    throw new Error("All fields are requires");
  }

  email = email.trim().toLowerCase();

  // check if user already exists-email
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new Error("User already exists");
  }

  // encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save the user in db
  const user = await User.create({
    name: username,
    email,
    password: hashedPassword,
  });

  //  generate a token for user and send it
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
  );

  return {
    user: {
      id: user.id,
    },
    token,
  };
};

export const loginUser = async (email, password) => {
  if (!(email && password)) {
    throw new Error("Send all data");
  }

  // find user in DB
  const user = await User.findOne({ where: { email } });

  // check if user is not there
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // match the password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
  );

  user.password = undefined;

  return { user, token };
};
