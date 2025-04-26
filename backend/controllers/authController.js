import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide all fields",
      });
    }

    //check if user alredy exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user aleready exists",
      });
    }

    //hashing password
    const hashedPw = await bcrypt.hash(password, 10);
    //creating new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPw,
    });
    await newUser.save();

    //generating jwt token
    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      process.env.JWT_SECERET
    );

    //setting cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    //sending success response
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({
      success: false,
      message: "error registering user",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide all the fields,",
      });
    }

    //check if user ecists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "inavild credentials",
      });
    }

    //check for password match
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "inavild credentials",
      });
    }

    //generating jwt token
    const token = jwt.sign(
      {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      process.env.JWT_SECERET
    );

    //setting cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    //sending success response
    res.status(201).json({
      success: true,
      message: "user loged-in successfully",
      user: existingUser,
    });
  } catch (error) {
    console.log("error in login user", error);
    res.status(500).json({
      success: false,
      message: "failed to login user",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
    });
    return res.status(200).json({
      success: true,
      message: "user logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to logout user",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({
        success: false,
        message: "not authorized no token",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECERET);
    const user = await UserModel.findById(decoded.id).populate("tweets");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "not authorized fake token",
      });
    }
    return res.status(200).json({
      success: true,
      message: "authorized",
      user,
    });
  } catch (error) {
    console.log("error in getting logged in user Data", error);
    res.status(500).json({
      success: false,
      message: "failed to get user data",
    });
  }
};
export { signup, login, logout, getMe };
