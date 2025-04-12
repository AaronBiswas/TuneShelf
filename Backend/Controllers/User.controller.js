import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (id, res) => {
  try {
    const cookieOptions = {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    };
    const Token = jwt.sign({ userId: id }, process.env.JWT_SECRET);
    res.cookie("jwt", Token, cookieOptions);
    return Token;
  } catch (error) {
    console.log("Error generating token", error);
    return res.json({
      success: false,
      message: "Error generating token",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const Checkpass = await bcrypt.compare(password, user.password || "");
    if (!Checkpass) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = generateTokenandSetCookie(user._id, res);
    return res.status(200).json({ message:"Login successful", success: true, token });
  } catch (error) {
    console.log("Error in loginUser", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const registerUser = async (req, res) => {
  const { fullname, username, password, email } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname: fullname,
      username: username,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = generateTokenandSetCookie(user._id, res);

    return res.json({ message:"User created successfully",success: true, token });
  } catch (error) {
    console.log("Error in registerUser", error);
    return res.json({ success: false, message: "Error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    console.log("Error in getUserProfile", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



