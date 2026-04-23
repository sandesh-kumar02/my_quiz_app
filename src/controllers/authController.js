import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });

    console.log(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // save the user to the database
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // generate jwt
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    // send a response
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login error" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "Uer not found" });
    }

    res.status(200).json({
      message: "User found successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const AllUser = async (req, res) => {
  try {
    const user = await userModel.find({}).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const destroyUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User destroy successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
