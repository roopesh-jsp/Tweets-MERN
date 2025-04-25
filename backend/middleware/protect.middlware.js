import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";

export const portectMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "not authorized no token",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECERET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "not authorized fake token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error on middleware checking token",
    });
  }
};
